const i18nextResources = {
  en: {
    translation: {
      meta: {
        title: "Repainter's homepage",
      },
      site: {
        heading: "Repainter's homepage",
        modelAlt: "3D R Logo",
      },
      description: "This is a multilingual page using i18next.",
      intro: {
        main: [
          `Welcome to my main webpage. Here, I'll share my footage and content filled with fresh ideas. This is the link where you can check the summary of my latest work → 🔗 <a data-i18n="intro.linkLabel" href="https://linktr.ee/repainter">LINK</a>`,
          `By the way, <b>the color of the title above is randomly generated</b>. Hit refresh to see a new set of colors!<br />
<b>The big R logo is movable</b>, so you can rotate it to see the 3D model from different angles. Wait until the load ends; the loading bar above the image will disappear once it's ready.`,
        ],
        linkLabel: "LINK",
      },
      privacy: `I don't collect any data from you, and I don't use cookies on this site.<br />
*You can check the source code of this webpage on <a href="https://github.com/takamasa1999/homepage">GitHub</a>.`,
      update: {
        stt: `<b>Fresh update:</b> A new text-to-speech communication space is now available → <i class="nf nf-mdi-text_to_speech"></i><a href="/stt-cloud"> <a href="/stt-cloud">STT Cloud</a><br />
Feel free to explore the app from this early stage! Documentation is still in progress 👨‍💻`,
      },
      lang: {
        en: "English",
        ja: "日本語",
      },
    },
  },
  ja: {
    translation: {
      meta: {
        title: "Repainterのホームページ",
      },
      site: {
        heading: "Repainterのホームページ",
        modelAlt: "3DなR",
      },
      description: "これは i18next を使った多言語ページです。",
      intro: {
        main: [
          `ようこそお越しくださいました。ここでは、私Repainterの作品や創作活動の軌跡をシェアしていこうと思います。活動の最新状況はこちらにまとめております→ 🔗 <a data-i18n="intro.linkLabel" href="https://linktr.ee/repainter">リンク</a>`,
          `ちなみに、<b>タイトルの色は毎度ランダムに</b>生成されます。ページを再読み込みすると新しい配色になるので、ぜひお試しください。<br />
            <b>また、3DのRのロゴは動かせます</b>。クリックして掴むと回転やズームができるので、様々な視点からのRをお楽しみください。モデルのロードには、回線状況によって少々時間がかかる場合がございます。読み込みが終わると、モデル上部のプログレスバーが消えます。`,
        ],
        linkLabel: "リンク",
      },
      privacy: `このサイトでは、トラッキングやユーザーデータの収集は一切行っておりませんので、安心してご利用ください。<br />
      ※このサイトに関わるソースコードは全て<a href="https://github.com/takamasa1999/homepage">GitHub</a>にてご確認いただけます。`,
      update: {
        stt: `<b>新着:</b> 音声文字起こしされた文章のみ投稿できる掲示板を公開しました → <i class="nf nf-mdi-text_to_speech"></i><a href="/stt-cloud"> STT Cloud</a><br />
          実験段階ですが、ぜひ触ってみてください。ドキュメントは鋭意整備中です 👨‍💻`,
      },
      lang: {
        en: "English",
        ja: "日本語",
      },
    },
  },
};
