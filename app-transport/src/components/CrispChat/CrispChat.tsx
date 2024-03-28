import React, { useEffect } from "react";

const CrispChat: React.FC = () => {
  useEffect(() => {
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = "18da1fcf-382c-44c3-be9c-8e923edd944b";

    (function () {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true; // Set async to true
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  return null; // Since this is a script, it doesn't render anything
};

export default CrispChat;
