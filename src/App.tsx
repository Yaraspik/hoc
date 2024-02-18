import "./style.css";
import React, { useState } from "react";

function Sort(Component: React.FunctionComponent<Item>) {
  return class extends React.Component<Item> {
    render() {
      if (this.props.views > 1000) {
        return (
          <Popular>
            <Component {...this.props} />
          </Popular>
        );
      }
      if (this.props.views < 1000) {
        return (
          <New>
            <Component {...this.props} />
          </New>
        );
      }
    }
  };
}

const SortVideo = Sort(Video);
const SortArticle = Sort(Article);

function New({ children }: { children: JSX.Element }) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {children}
    </div>
  );
}

function Popular({ children }: { children: JSX.Element }) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {children}
    </div>
  );
}

function Article(props: Item) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props: Item) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

function List({ list }: { list: Array<Item> }) {
  return (
    <>
      {list.map((item) => {
        switch (item.type) {
          case "video":
            return <SortVideo {...item} />;

          case "article":
            return <SortArticle {...item} />;
        }
      })}
    </>
  );
}

type Item = {
  type: string;
  title?: string;
  url?: string;
  views: number;
};

export default function App() {
  const [list] = useState([
    {
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ]);

  return <List list={list} />;
}
