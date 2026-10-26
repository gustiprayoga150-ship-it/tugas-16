import Link from 'next/link';

export default function PostDetail({ post }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <Link href="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
          &larr; Kembali ke Katalog
        </Link>
        <div className="border-b pb-4 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            ID Artikel: {post.id}
          </span>
          <h1 className="text-3xl font-bold mt-2 text-gray-900 capitalize">{post.title}</h1>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">{post.body}</p>
      </div>
    </div>
  );
}

// 1. Menentukan ID mana saja yang akan dibuatkan file HTML statis saat BUILD
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Jika ID tidak ada di paths, tampilkan 404
  };
}

// 2. Fetch data detail spesifik berdasarkan ID untuk setiap halaman statis
export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}