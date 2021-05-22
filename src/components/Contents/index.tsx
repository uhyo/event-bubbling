type Props = {
  level: number;
  children: React.ReactNode;
};

export const Contents: React.VFC<Props> = ({ level, children }) => {
  return (
    <article>
      <h1>Event Bubbling Visualized</h1>
      <style jsx>
        {`
          h1 {
            text-align: center;
            font-size: 2em;
          }
        `}
      </style>
      {children}
    </article>
  );
};
