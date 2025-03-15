import React from "react";
import Text from "../atoms/Text";

const TermsContent: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Text size="large">利用規約</Text>
      <Text>
        本サービスをご利用いただく前に、以下の利用規約をお読みください。
        本サービスを利用することにより、これらの条件に同意したものとみなします。
      </Text>
      <Text>
        1.
        本サービスは、個人の健康管理を目的としたものであり、医療行為を目的としたものではありません。
      </Text>
      <Text>
        2. 利用者は、自己の責任において本サービスを利用するものとします。
      </Text>
      <Text>
        3.
        本サービスの提供者は、予告なくサービスの変更・停止を行うことができます。
      </Text>
    </div>
  );
};

export default TermsContent;
