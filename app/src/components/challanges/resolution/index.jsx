import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Header from './header';
import Description from './description';
import Action from './action';

import Team from './interactievComponents/team';
import Problem from './interactievComponents/problem';
import JOTRIFLASUAPLA from './interactievComponents/jotrifalsuapla';
import Submission from './interactievComponents/submission';
import Finish from './interactievComponents/finish';

const Resolutuion = ({ history }) => {
  const [index, setindex] = useState(0);

  const next = (n) => {
    if (n > index) {
      setindex(n);
    } else {
      setindex(index + 1);
    }
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
            videoUrl="https://www.youtube.com/embed/C_NwNqJhJBw"
            title="inspiração"
            number={1}
            fileUrl="https://crieoimpossivel.com.br/pdf/fase1.pdf"
          />
          <Action title="cadastrar equipe" next={next}>
            <Team history={history} />
          </Action>
        </>
        <>
          <Description
            videoUrl="https://www.youtube.com/embed/51_k-SzzvFA"
            title="Diálogo"
            number={2}
            fileUrl="https://crieoimpossivel.com.br/pdf/fase2.pdf"
          />
          <Action title="preenchendo o desafio" next={next} back={back}>
            <Problem />
          </Action>
        </>
        <>
          <Description
            videoUrl="https://www.youtube.com/embed/66eAu__gteU"
            title="Mão na massa"
            number={3}
            fileUrl="https://crieoimpossivel.com.br/pdf/fase3.pdf"
          />
          <Action title="inserir jotrifalsuapla" next={next} back={back}>
            <JOTRIFLASUAPLA />
          </Action>
        </>
        <>
          <Description
            videoUrl="https://www.youtube.com/embed/SKJGAdA8jkQ"
            title="Envio do desafio"
            number={4}
            fileUrl="https://crieoimpossivel.com.br/pdf/fase4.pdf"
          />
          <Action next={next} back={back}>
            <Submission />
          </Action>
        </>
        <>
          <Finish back={back} />
        </>
      </SwipeableViews>
    </main>
  );
};

export default Resolutuion;
