import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Header from './header';
import Description from './description';
import Action from './action';

import Team from './interactievComponents/team';
import Problem from './interactievComponents/problem';
import JOTRIFLASUAPLA from './interactievComponents/jotrifalsuapla'
import Submission from './interactievComponents/submission'

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
        <>
          <Description
            videoUrl="https://www.youtube.com/embed/tH9Q_bYUjI0"
            title="Mão na massa"
            number={3}
            fileUrl="https://app.projetomarvin.com/assets/pdf/Marvin+-+fase+01.pdf"
          />
          <Action title="inserir jotrifalsuapla" next={next} back={back}>
            <JOTRIFLASUAPLA />
          </Action>
        </>
        <>
          <Description
            videoUrl="https://www.youtube.com/embed/tH9Q_bYUjI0"
            title="Envio do desafio"
            number={4}
            fileUrl="https://app.projetomarvin.com/assets/pdf/Marvin+-+fase+01.pdf"
          />
          <Action next={next} back={back}>
            <Submission />
          </Action>
        </>
      </SwipeableViews>
    </main>
  );
};

export default Resolutuion;
