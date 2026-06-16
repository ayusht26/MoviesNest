import type { APIRoute } from 'astro';
import { tmdbInternal } from '../../../lib/tmdb';

export const ALL: APIRoute = async ({ params, url }) => {
  const endpoint = '/' + (params.endpoint || '');
  const searchParams = Object.fromEntries(url.searchParams.entries());

  try {
    const data = await tmdbInternal(endpoint, searchParams);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=30',
      },
    });
  } catch (error: any) {
    console.error(`Error in TMDB proxy for endpoint ${endpoint}:`, error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal Server Error',
        results: [],
        __error: true,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
