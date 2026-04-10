import { basehub } from "basehub";
import { Pump } from "basehub/react-pump";
import { use } from "react";

export const generateStaticParams = async () => {
  const { writing } = await basehub().query({
    writing: { items: { _slug: true } },
  });

  return writing.items.map((w) => {
    return { slug: w._slug };
  });
};

export default function Page({ params }: PageProps<"/p/[slug]">) {
  const { slug } = use(params);
  return (
    <Pump
      queries={[
        {
          writing: {
            item: {
              _title: true,
            },
            __args: {
              filter: {
                _sys_slug: { eq: slug },
              },
            },
          },
        },
      ]}
    >
      {async ([data]) => {
        "use server";

        return (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        );
      }}
    </Pump>
  );
}
