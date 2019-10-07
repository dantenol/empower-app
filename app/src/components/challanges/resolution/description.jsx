import React from 'react';
import classNames from 'classnames';

import classes from './resolution.module.css';
import download from '../../../assets/images/cloud-download.svg';

const Description = ({ videoUrl, title, number, fileUrl }) => (
  <>
    <div className={classes.description}>
      <div className={classes.title}>
        <div className={classes.number}>{number}</div>
        <p className={classes.name}>{title}</p>
      </div>
      <div className={classes.video}>
        <iframe
          className={classes.videoFrame}
          title={title}
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <a
        href={fileUrl}
        target="__blank"
        className={classNames(classes.downloadButton, classes.button)}
      >
        <img alt="download" src={download} className={classes.buttonIcon} />
        <span className={classes.buttonText}>material de apoio</span>
      </a>
    </div>
    <div
      className={classNames(
        classes.darkArrow,
        number % 2 === 0 && classes.mirror,
      )}
    ></div>
    <div className={classNames(
        classes.lightArrow,
        number % 2 === 0 && classes.mirror,
      )}></div>
  </>
);

export default Description;
