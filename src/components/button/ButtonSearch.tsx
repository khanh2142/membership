import React from "react";
import { Button, IconButton } from "rsuite";

const ButtonSearch = ({ size }: { size: string }) => {
  return (
    <>
      <Button appearance="primary" className={`button-search button-${size}`}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_218_500)">
            <path
              d="M7.14901 0C8.56295 0 9.94514 0.419282 11.1208 1.20483C12.2964 1.99037 13.2127 3.10689 13.7538 4.4132C14.2949 5.71951 14.4365 7.15694 14.1607 8.54371C13.8848 9.93048 13.2039 11.2043 12.2041 12.2041C11.2043 13.2039 9.93048 13.8848 8.54371 14.1607C7.15694 14.4365 5.71951 14.2949 4.4132 13.7538C3.10689 13.2127 1.99037 12.2964 1.20483 11.1208C0.419282 9.94514 0 8.56295 0 7.14901C0.00206759 5.25361 0.755929 3.43643 2.09618 2.09618C3.43643 0.755929 5.25361 0.00206759 7.14901 0V0ZM7.14901 12.5848C8.22358 12.5848 9.27403 12.2661 10.1675 11.6691C11.061 11.0721 11.7574 10.2236 12.1686 9.23079C12.5798 8.23801 12.6874 7.14559 12.4778 6.09166C12.2681 5.03773 11.7507 4.06964 10.9908 3.3098C10.231 2.54996 9.26289 2.03251 8.20896 1.82287C7.15504 1.61323 6.06261 1.72082 5.06984 2.13204C4.07706 2.54327 3.22852 3.23965 2.63152 4.13312C2.03451 5.0266 1.71587 6.07704 1.71587 7.15161C1.71839 8.59148 2.29173 9.97159 3.3102 10.9894C4.32866 12.0072 5.70914 12.5797 7.14901 12.5813V12.5848Z"
              fill="white"
            />
            <path
              d="M15.1425 16.0001C15.0297 16.0004 14.9179 15.9785 14.8137 15.9354C14.7094 15.8924 14.6147 15.8291 14.535 15.7493L10.9479 12.1613C10.7867 12.0002 10.6962 11.7816 10.6962 11.5538C10.6962 11.3259 10.7867 11.1074 10.9479 10.9462C11.109 10.7851 11.3275 10.6946 11.5554 10.6946C11.7833 10.6946 12.0018 10.7851 12.163 10.9462L15.7492 14.5359C15.8693 14.6559 15.9511 14.8088 15.9842 14.9753C16.0173 15.1418 16.0002 15.3144 15.9352 15.4712C15.8701 15.628 15.76 15.762 15.6187 15.8562C15.4774 15.9503 15.3114 16.0004 15.1416 16.0001H15.1425Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_218_500">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Button>
    </>
  );
};

export default ButtonSearch;
