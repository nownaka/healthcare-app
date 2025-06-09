// 健康データ評価の結果型
export interface HealthEvaluation {
  message: string;
  imagePath: string;
  audioPath: string;
}

// 体重変化の評価
export const evaluateWeightChange = (
  currentWeight: number,
  previousWeight: number | null
): HealthEvaluation => {
  if (previousWeight === null) {
    // 初回記録の場合
    return {
      message: "初回の記録なのだ！これからがんばっていくのだ！",
      imagePath: "/assets/image/ずんだもん_通常0000.png",
      audioPath: "/assets/voice/006_ずんだもん（ノーマル）_ほう、やるじゃない….wav"
    };
  }

  const weightDiff = currentWeight - previousWeight;

  if (weightDiff <= -0.3) {
    // 前日より大きく減った
    return {
      message: "ほう、やるじゃないか。この調子でいくのだ",
      imagePath: "/assets/image/ずんだもん_指示0003.png",
      audioPath: "/assets/voice/006_ずんだもん（ノーマル）_ほう、やるじゃない….wav"
    };
  } else if (weightDiff >= 0.3) {
    // 前日より大きく増えた
    return {
      message: "ふーん…昨日なに食べたのか、正直に申告するのだ。ラーメン？唐揚げ？…そりゃ太るのだ。",
      imagePath: "/assets/image/ずんだもん_怒り0001.png",
      audioPath: "/assets/voice/008_ずんだもん（ノーマル）_ふーん…昨日なに食….wav"
    };
  } else {
    // 変化上下0.3以内
    return {
      message: "動かざること山の如し、なのだ。でも停滞期かもだから焦らなくていいのだ。",
      imagePath: "/assets/image/ずんだもん_通常0000.png",
      audioPath: "/assets/voice/010_ずんだもん（ノーマル）_動かざること山の如….wav"
    };
  }
};

// カロリー摂取量の評価
export const evaluateCalorieIntake = (
  calorieIntake: number,
  targetCalorie: number
): HealthEvaluation => {
  const calorieDiff = calorieIntake - targetCalorie;
  const diffPercentage = (calorieDiff / targetCalorie) * 100;

  if (diffPercentage < -10) {
    // 摂取カロリーが目標より少ない（10%以上少ない）
    return {
      message: "まさかの我慢の美学…ストイックすぎて心配になるのだ。たまにはチョコもいいのだ。",
      imagePath: "/assets/image/ずんだもん_悲しみ0002.png",
      audioPath: "/assets/voice/014_ずんだもん（ノーマル）_まさかの我慢の美学….wav"
    };
  } else if (diffPercentage >= -10 && diffPercentage <= 10) {
    // 目標付近でちょうどいい（±10%以内）
    return {
      message: "バランス型人間ってこういう人のこと言うのだ。ちょっと見直したのだ。",
      imagePath: "/assets/image/ずんだもん_指示0003.png",
      audioPath: "/assets/voice/016_ずんだもん（ノーマル）_バランス型人間って….wav"
    };
  } else {
    // オーバーしてる（10%以上多い）
    return {
      message: "…ふーん。気づかないふりしてあげようかと思ったけど、カロリー爆弾すぎなのだ。",
      imagePath: "/assets/image/ずんだもん_怒り0001.png",
      audioPath: "/assets/voice/018_ずんだもん（ノーマル）_…ふーん。気づかな….wav"
    };
  }
};

// 睡眠時間の評価
export const evaluateSleepTime = (sleepTime: number): HealthEvaluation => {
  if (sleepTime >= 7) {
    // 7時間以上寝てる
    return {
      message: "しっかり寝るとか…人間として大事なことを知ってるのだ。えらいのだ。",
      imagePath: "/assets/image/ずんだもん_指示0003.png",
      audioPath: "/assets/voice/022_ずんだもん（ノーマル）_しっかり寝るとか…….wav"
    };
  } else if (sleepTime >= 5 && sleepTime < 7) {
    // 5〜7時間
    return {
      message: "適正なのだ、日本人的にはいいほうだと思っていいのだ",
      imagePath: "/assets/image/ずんだもん_通常0000.png",
      audioPath: "/assets/voice/024_ずんだもん（ノーマル）_適正なのだ、日本人….wav"
    };
  } else {
    // 5時間未満
    return {
      message: "あのな…さすがに寝なさすぎなのだ。目がパキパキなのだ。寝ろ。",
      imagePath: "/assets/image/ずんだもん_怒り0001.png",
      audioPath: "/assets/voice/026_ずんだもん（ノーマル）_あのな…さすがに寝….wav"
    };
  }
};

// 総合評価（複数の要素を考慮して最も重要なメッセージを選択）
export const getOverallEvaluation = (
  weightEval: HealthEvaluation,
  calorieEval: HealthEvaluation | null,
  sleepEval: HealthEvaluation
): HealthEvaluation => {
  // 優先順位: 睡眠不足 > 体重増加 > カロリーオーバー > その他
  
  // 睡眠不足の場合は最優先
  if (sleepEval.audioPath.includes("026_")) {
    return sleepEval;
  }
  
  // 体重増加の場合は次に優先
  if (weightEval.audioPath.includes("008_")) {
    return weightEval;
  }
  
  // カロリーオーバーの場合
  if (calorieEval && calorieEval.audioPath.includes("018_")) {
    return calorieEval;
  }
  
  // 体重減少の場合は良いニュースなので優先
  if (weightEval.audioPath.includes("006_")) {
    return weightEval;
  }
  
  // その他の場合は睡眠評価を返す
  return sleepEval;
};
