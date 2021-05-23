export const Success: React.VFC = () => {
  return (
    <p>
      SUCCESS!
      <style jsx>
        {`
          p {
            position: absolute;
            left: 50%;
            top: 50%;
            margin: 0;
            color: #ff6633;
            transform-origin: 50% 50%;
            transform: translate(-50%, -50%);
            font-size: 2em;
            font-weight: bold;
            z-index: 2;

            animation-name: appear;
            animation-play-state: running;
            animation-timing-function: ease-in;
            animation-iteration-count: 1;
            animation-duration: 0.5s;
            animation-delay: 0.3s;
            animation-fill-mode: both;
          }
          @keyframes appear {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </p>
  );
};
