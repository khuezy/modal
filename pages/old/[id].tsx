const posts = [
  {
    id: "1",
    title: "First post",
  },
];

export async function getStaticPaths() {
  return {
    paths: posts.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
}

export function getStaticProps({ params }: any) {
  return {
    props: {
      data: posts.find(({ id }) => id === params.id),
      time: Date.now(),
    },
  };
}

type Props = {
  data: any
  time: number
}
export default function Post(p: Props) {
  const { data, time } = p
  console.log(p)
  return (
    <div>
      <article>
        <h1>Static Site Generation with dynamic routes</h1>
        <hr />
        <p>
          <b>Test 1:</b>
          This timestamp 👉 {time} should be when the `npx open-next build` was
          run, not when the page is refreshed. Hence, this time should not
          change on refresh.js
        </p>
        <p>
          <b>Test 2:</b>
          This string 👉 "{data?.title}" should be "First post"
        </p>
        <p>
          <b>Test 3:</b>
          Check your browser's developer console. First request might show cache
          MISS on first load. Subsequent refreshes should shows cache HIT.
        </p>
      </article>
    </div>
  );
}
