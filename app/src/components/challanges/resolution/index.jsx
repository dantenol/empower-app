import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Header from './header';
import Description from './description';
import Action from './action';

import Team from './interactievComponents/team';
import Problem from './interactievComponents/problem';

const Resolutuion = () => {
  const [index, setindex] = useState(0);

  const next = () => {
    setindex(index + 1);
  };

  const back = () => {
    setindex(index - 1);
  };

  return (
    <main>
      <Header />
      <SwipeableViews
        containerStyle={{ height: 'calc(100vh - 72px)' }}
        disabled
        index={index}
      >
        <>
          <Description
            videoUrl="https://www.youtube.com/embed/tH9Q_bYUjI0"
            title="inspiração"
            number={1}
            fileUrl="https://app.projetomarvin.com/assets/pdf/Marvin+-+fase+01.pdf"
          />
          <Action title="cadastrar equipe" next={next}>
            <Team />
          </Action>
        </>
        <>
          <Description
            videoUrl="https://www.youtube.com/embed/tH9Q_bYUjI0"
            title="Diálogo"
            number={2}
            fileUrl="https://app.projetomarvin.com/assets/pdf/Marvin+-+fase+01.pdf"
          />
          <Action title="preenchendo o desafio" next={next} back={back}>
            <Problem />
          </Action>
        </>
      </SwipeableViews>
    </main>
  );
};

export default Resolutuion;
