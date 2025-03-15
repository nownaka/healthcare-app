import React from "react";
import Header from "../organisms/Header";
import TermsContent from "../organisms/TermsContent";

const TermsPage: React.FC = () => {
  return (
    <div>
      <Header title="利用規約" />
      <TermsContent />
    </div>
  );
};

export default TermsPage;
