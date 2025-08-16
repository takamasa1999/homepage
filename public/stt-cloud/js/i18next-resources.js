const i18nextResources = {
  en: {
    translation: {
      meta: { title: "STT Cloud (About)" },
      lang: { en: "English", ja: "日本語" },
      about: {
        heading: "About STT Cloud",
        pIntro: `Welcome to STT Cloud! You might be wondering... what is this?<br />Think of it like a bulletin board — but instead of typing, you post only what you say. Yep, as some of you have already guessed, STT stands for <b>Speech To Text</b>.<br />
          And don’t worry — there’s no hidden telemetry or data harvesting here. This app is completely open source:
          <a href="https://github.com/takamasa1999/homepage" target="_blank">Check on GitHub</a>.`,
        featuresTitle: "Here’s what this voice-powered bulletin board can do:",
        feature1:
          "Your audio will be transcribed, and once ready, it will appear on the board.",
        feature2:
          "No usernames, no thread names, and of course, no passwords — just pure, anonymous posting.",
        feature3:
          "Say whatever you want, but please be careful <b>not to post any sensitive or confidential information</b>.",
        feature4: `Any language is welcome! Thanks to the modern STT model, <a href="https://github.com/openai/whisper" target="_blank">Whisper</a>, the default setting is “auto,” which detects whatever language you speak and transcribes it into the same language. If auto-detection isn’t working well — especially for short sentences — you can select your language from the dropdown. More options will be added over time.`,
        pIdea: `This is a completely experimental project — just me bringing a small idea to life:
          <b>What if there was a bulletin board where people could post only by speaking?</b>`,
        pEnjoy:
          "Enjoy this little sandbox! The future of this platform is in your hands.",
        pNote: `<b>Note:</b> This app is running on a low-spec server (budget constraints!), so transcriptions may take a little time. Don’t worry — everything runs asynchronously on the server, so even if you leave the board before your transcription is done, it will still be processed and posted correctly.`,
        backStt: "Back to STT Cloud",
        backHome: "Back to Home",
      },
    },
  },

  ja: {
    translation: {
      meta: { title: "STT Cloud（概要）" },
      lang: { en: "English", ja: "日本語" },
      about: {
        heading: "STT Cloudについて",
        pIntro: `ようこそSTT Cloudへ！これはざっくりいうと<b>音声文字起こしされたことしか投稿できない掲示板</b>です。また、STTというのは、Speech To Textという用語の略です。<br />
          「プライバシーはどうなっとるんじゃい」と気になるそこのあなたへ。このサイトでは一切のトラッキングを行っておりません。文字起こしに使用される音声も都度サーバー側で削除されるよう設計しております。コードはオープンソースで、下記からご覧いただけます。<br/>
          <a href="https://github.com/takamasa1999/homepage" target="_blank">GitHubにてソースコードを見てみる</a>`,
        featuresTitle: "以下はこの掲示板の特徴です：",
        feature1:
          "音声が文字起こしされ、準備ができ次第、掲示板に表示されます。",
        feature2:
          "ユーザー名・スレッド名・パスワードなどは不要。完全に匿名で投稿できます。",
        feature3:
          "スレッド分けされていないため、つぶやき感覚で自由に投稿できます。落書きみたいなものです。<b>くれぐれも機密情報や個人情報は投稿しないようご注意ください</b>。",
        feature4: `使用言語はなんでもOK！最新のSTT モデル <a href="https://github.com/openai/whisper" target="_blank">Whisper</a> により、初期設定ではしゃべった言語が自動検出される仕様です。短文では検出が難しい場合もあるので、その際はドロップダウンから言語を選択してください。対応言語は使用率に応じて拡充予定です。`,
        pIdea: `これは私のふとした思いつき、<b>「もし発話したことしか投稿できない掲示板があったら」</b>を具現化してみたプロジャクトです。`,
        pEnjoy: "それではお楽しみください。今後の掲示版の行く末はあなた次第！",
        pNote: `<b>注記：</b> 低スペックなサーバーで運営しているため、文字起こしには少々時間がかかる場合がございます（金欠）。サーバー側は非同期処理なので、ページを離れても文字起こしは続行され、結果は随時更新されます。`,
        backStt: "STT Cloudに戻る",
        backHome: "ホームに戻る",
      },
    },
  },
};
