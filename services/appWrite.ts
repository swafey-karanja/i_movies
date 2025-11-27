import { Movie, TrendingMovie } from '@/interfaces/interfaces';
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

// track the searches made by users
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DB_ID, TABLE_ID, [
      Query.equal('searchTerm', [query]),
    ]);

    console.log({ result });

    // check if a record of that search term exists
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      // if a document is found increment the searchCount field
      await database.updateDocument(DB_ID, TABLE_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      // if no document is found create a new document in the DB
      await database.createDocument(DB_ID, TABLE_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
    throw error;
  }
};

export const fetchTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DB_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log({ error });
    return undefined;
  }
};
