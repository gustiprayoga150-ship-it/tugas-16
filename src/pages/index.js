import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Katalog Artikel (SSG) - Kelompok 3
        </h1>
        <p className="text-gray-600 mb-6">
          Halaman ini dibuat menggunakan Static Site Generation (getStaticProps).
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <span className="text-xs font-semibold text-blue-600 uppercase">Artikel #{post.id}</span>
              <h2 className="text-xl font-bold mt-1 mb-2 capitalize text-gray-900">{post.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.body}</p>
              <Link 
                href={`/posts/${post.id}`} 
                className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
              >
                Baca Selengkapnya &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// FUNGSI KHUSUS SSG: Dijalankan HANYA pada saat 'npm run build'
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}