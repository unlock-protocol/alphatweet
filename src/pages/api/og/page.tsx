import { DEFAULT_SEO } from "@/config/seo";
import { formatter } from "@/utils/formatters";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

declare module "react" {
  interface HTMLAttributes<T> {
    tw?: string;
  }

  interface SVGProps<T> {
    tw?: string;
  }
}

export const config = {
  runtime: "edge",
};

const fontBoldURL = new URL(
  "../../../assets/fonts/SpaceGrotesk-Bold.ttf",
  import.meta.url
);

const fontSemiBoldURL = new URL(
  "../../../assets/fonts/SpaceGrotesk-SemiBold.ttf",
  import.meta.url
);

const fontRegularURL = new URL(
  "../../../assets/fonts/SpaceGrotesk-Regular.ttf",
  import.meta.url
);

const fontBold = fetch(fontBoldURL).then((res) => res.arrayBuffer());
const fontSemiBold = fetch(fontSemiBoldURL).then((res) => res.arrayBuffer());
const fontRegular = fetch(fontRegularURL).then((res) => res.arrayBuffer());

async function TweetOgHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fontBoldData = await fontBold;
  const fontSemiBoldData = await fontSemiBold;
  const fontRegularData = await fontRegular;
  const title = searchParams.get("title") ?? DEFAULT_SEO.title;
  const description =
    searchParams.get("description") ?? DEFAULT_SEO.description;

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center relative rounded justify-center bg-white bg-black">
        <svg
          width="1200"
          tw="top-0 right-0 bottom-0 left-0"
          height="600"
          viewBox="0 0 1440 795"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1024_76838)">
            <rect width="1440" height="400" fill="#15191B" />
            <line y1="45.5" x2="1440" y2="45.5" stroke="#373A3E" />
            <line y1="95.5" x2="1440" y2="95.5" stroke="#373A3E" />
            <line y1="145.5" x2="1440" y2="145.5" stroke="#373A3E" />
            <line y1="195.5" x2="1440" y2="195.5" stroke="#373A3E" />
            <line y1="245.5" x2="1440" y2="245.5" stroke="#373A3E" />
            <line y1="295.5" x2="1440" y2="295.5" stroke="#373A3E" />
            <line y1="345.5" x2="1440" y2="345.5" stroke="#373A3E" />
            <line
              x1="1400.5"
              y1="2.18557e-08"
              x2="1400.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1350.5"
              y1="2.18557e-08"
              x2="1350.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1300.5"
              y1="2.18557e-08"
              x2="1300.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1250.5"
              y1="2.18557e-08"
              x2="1250.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1200.5"
              y1="2.18557e-08"
              x2="1200.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1150.5"
              y1="2.18557e-08"
              x2="1150.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1100.5"
              y1="2.18557e-08"
              x2="1100.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1050.5"
              y1="2.18557e-08"
              x2="1050.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="1000.5"
              y1="2.18557e-08"
              x2="1000.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="950.5"
              y1="2.18557e-08"
              x2="950.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="900.5"
              y1="2.18557e-08"
              x2="900.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="850.5"
              y1="2.18557e-08"
              x2="850.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="800.5"
              y1="2.18557e-08"
              x2="800.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="750.5"
              y1="2.18557e-08"
              x2="750.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="700.5"
              y1="2.18557e-08"
              x2="700.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="650.5"
              y1="2.18557e-08"
              x2="650.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="600.5"
              y1="2.18557e-08"
              x2="600.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="550.5"
              y1="2.18557e-08"
              x2="550.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="500.5"
              y1="2.18557e-08"
              x2="500.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="450.5"
              y1="2.18557e-08"
              x2="450.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="400.5"
              y1="2.18557e-08"
              x2="400.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="350.5"
              y1="2.18557e-08"
              x2="350.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="300.5"
              y1="2.18557e-08"
              x2="300.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="250.5"
              y1="2.18557e-08"
              x2="250.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="200.5"
              y1="2.18557e-08"
              x2="200.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="150.5"
              y1="2.18557e-08"
              x2="150.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="100.5"
              y1="2.18557e-08"
              x2="100.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="50.5"
              y1="2.18557e-08"
              x2="50.5"
              y2="400"
              stroke="#373A3E"
            />
            <line
              x1="0.5"
              y1="2.18557e-08"
              x2="0.499983"
              y2="400"
              stroke="#373A3E"
            />
            <path
              d="M1440 86L0 250.635V400H1440V86Z"
              fill="url(#paint0_linear_1024_76838)"
            />
            <path
              d="M1440 86L0 250.635V400H1440V86Z"
              fill="url(#paint1_linear_1024_76838)"
            />
            <path
              d="M0 -13L1440 203.543V400H0V-13Z"
              fill="url(#paint2_linear_1024_76838)"
            />
            <path
              d="M0 -13L1440 203.543V400H0V-13Z"
              fill="url(#paint3_linear_1024_76838)"
            />
          </g>
          <g clip-path="url(#clip1_1024_76838)">
            <rect
              width="1440"
              height="400"
              transform="translate(1440 795) rotate(-180)"
              fill="#15191B"
            />
            <line
              x1="1440"
              y1="749.5"
              x2="-4.37115e-08"
              y2="749.5"
              stroke="#373A3E"
            />
            <line
              x1="1440"
              y1="699.5"
              x2="-4.37115e-08"
              y2="699.5"
              stroke="#373A3E"
            />
            <line
              x1="1440"
              y1="649.5"
              x2="-4.37115e-08"
              y2="649.5"
              stroke="#373A3E"
            />
            <line
              x1="1440"
              y1="599.5"
              x2="-4.37115e-08"
              y2="599.5"
              stroke="#373A3E"
            />
            <line
              x1="1440"
              y1="549.5"
              x2="-4.37115e-08"
              y2="549.5"
              stroke="#373A3E"
            />
            <line
              x1="1440"
              y1="499.5"
              x2="-4.37115e-08"
              y2="499.5"
              stroke="#373A3E"
            />
            <line
              x1="1440"
              y1="449.5"
              x2="-4.37115e-08"
              y2="449.5"
              stroke="#373A3E"
            />
            <line x1="39.5" y1="795" x2="39.5001" y2="395" stroke="#373A3E" />
            <line x1="89.5" y1="795" x2="89.5001" y2="395" stroke="#373A3E" />
            <line x1="139.5" y1="795" x2="139.5" y2="395" stroke="#373A3E" />
            <line x1="189.5" y1="795" x2="189.5" y2="395" stroke="#373A3E" />
            <line x1="239.5" y1="795" x2="239.5" y2="395" stroke="#373A3E" />
            <line x1="289.5" y1="795" x2="289.5" y2="395" stroke="#373A3E" />
            <line x1="339.5" y1="795" x2="339.5" y2="395" stroke="#373A3E" />
            <line x1="389.5" y1="795" x2="389.5" y2="395" stroke="#373A3E" />
            <line x1="439.5" y1="795" x2="439.5" y2="395" stroke="#373A3E" />
            <line x1="489.5" y1="795" x2="489.5" y2="395" stroke="#373A3E" />
            <line x1="539.5" y1="795" x2="539.5" y2="395" stroke="#373A3E" />
            <line x1="589.5" y1="795" x2="589.5" y2="395" stroke="#373A3E" />
            <line x1="639.5" y1="795" x2="639.5" y2="395" stroke="#373A3E" />
            <line x1="689.5" y1="795" x2="689.5" y2="395" stroke="#373A3E" />
            <line x1="739.5" y1="795" x2="739.5" y2="395" stroke="#373A3E" />
            <line x1="789.5" y1="795" x2="789.5" y2="395" stroke="#373A3E" />
            <line x1="839.5" y1="795" x2="839.5" y2="395" stroke="#373A3E" />
            <line x1="889.5" y1="795" x2="889.5" y2="395" stroke="#373A3E" />
            <line x1="939.5" y1="795" x2="939.5" y2="395" stroke="#373A3E" />
            <line x1="989.5" y1="795" x2="989.5" y2="395" stroke="#373A3E" />
            <line x1="1039.5" y1="795" x2="1039.5" y2="395" stroke="#373A3E" />
            <line x1="1089.5" y1="795" x2="1089.5" y2="395" stroke="#373A3E" />
            <line x1="1139.5" y1="795" x2="1139.5" y2="395" stroke="#373A3E" />
            <line x1="1189.5" y1="795" x2="1189.5" y2="395" stroke="#373A3E" />
            <line x1="1239.5" y1="795" x2="1239.5" y2="395" stroke="#373A3E" />
            <line x1="1289.5" y1="795" x2="1289.5" y2="395" stroke="#373A3E" />
            <line x1="1339.5" y1="795" x2="1339.5" y2="395" stroke="#373A3E" />
            <line x1="1389.5" y1="795" x2="1389.5" y2="395" stroke="#373A3E" />
            <line x1="1439.5" y1="795" x2="1439.5" y2="395" stroke="#373A3E" />
            <path
              d="M0 709L1440 544.365L1440 395L2.74508e-05 395L0 709Z"
              fill="url(#paint4_linear_1024_76838)"
            />
            <path
              d="M0 709L1440 544.365L1440 395L2.74508e-05 395L0 709Z"
              fill="url(#paint5_linear_1024_76838)"
            />
            <path
              d="M1440 808L1.89308e-05 591.458L3.61056e-05 395L1440 395L1440 808Z"
              fill="url(#paint6_linear_1024_76838)"
            />
            <path
              d="M1440 808L1.89308e-05 591.458L3.61056e-05 395L1440 395L1440 808Z"
              fill="url(#paint7_linear_1024_76838)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1024_76838"
              x1="852.5"
              y1="400"
              x2="780.383"
              y2="129.387"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1024_76838"
              x1="852.5"
              y1="400"
              x2="780.383"
              y2="129.387"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1024_76838"
              x1="587.5"
              y1="400"
              x2="706.5"
              y2="60.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1024_76838"
              x1="587.5"
              y1="400"
              x2="522"
              y2="193"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_1024_76838"
              x1="587.5"
              y1="395"
              x2="659.617"
              y2="665.613"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_1024_76838"
              x1="587.5"
              y1="395"
              x2="659.617"
              y2="665.613"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_1024_76838"
              x1="852.5"
              y1="395"
              x2="733.5"
              y2="734.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint7_linear_1024_76838"
              x1="852.5"
              y1="395"
              x2="918"
              y2="602"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#15191B" />
              <stop offset="1" stop-color="#15191B" stop-opacity="0" />
            </linearGradient>
            <clipPath id="clip0_1024_76838">
              <rect width="1440" height="400" fill="white" />
            </clipPath>
            <clipPath id="clip1_1024_76838">
              <rect
                width="1440"
                height="400"
                fill="white"
                transform="translate(1440 795) rotate(-180)"
              />
            </clipPath>
          </defs>
        </svg>

        <svg
          width="1200"
          height="600"
          tw="absolute"
          viewBox="0 0 1200 630"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="8"
            width="1184"
            height="614"
            stroke="url(#paint0_linear_834_105624)"
            stroke-width="16"
          />
          <defs>
            <linearGradient
              id="paint0_linear_834_105624"
              x1="0"
              y1="0"
              x2="1206.84"
              y2="169.471"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#88F1FF" />
              <stop offset="1" stop-color="#FFD37E" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width="196"
          tw="right-24 bottom-24 absolute"
          height="64"
          viewBox="0 0 196 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M66.064 30.3333V13.6667H69.3936V10.3333H72.7232V7H82.712V10.3333H86.0416V13.6667H89.3712V30.3333H82.712V23.6667H72.7232V30.3333H66.064ZM72.7232 20.3333H82.712V13.6667H79.3824V10.3333H76.0528V13.6667H72.7232V20.3333Z"
            fill="white"
          />
          <path
            d="M96.0304 30.3333V7H102.69V27H116.008V30.3333H96.0304Z"
            fill="white"
          />
          <path
            d="M119.338 30.3333V7H139.315V10.3333H142.645V20.3333H139.315V23.6667H125.997V30.3333H119.338ZM125.997 20.3333H135.986V10.3333H125.997V20.3333Z"
            fill="white"
          />
          <path
            d="M145.974 30.3333V7H152.634V17H162.622V7H169.282V30.3333H162.622V20.3333H152.634V30.3333H145.974Z"
            fill="white"
          />
          <path
            d="M172.611 30.3333V13.6667H175.941V10.3333H179.271V7H189.259V10.3333H192.589V13.6667H195.919V30.3333H189.259V23.6667H179.271V30.3333H172.611ZM179.271 20.3333H189.259V13.6667H185.93V10.3333H182.6V13.6667H179.271V20.3333Z"
            fill="white"
          />
          <path
            d="M76.0528 57V43.6667H69.3936V40.3333H76.0528V33.6667H82.712V40.3333H89.3712V43.6667H82.712V57H76.0528Z"
            fill="white"
          />
          <path
            d="M99.36 53.6667H102.69V57H96.0304V53.6667H92.7008V40.3333H99.36V53.6667ZM106.019 40.3333V53.6667H102.69V40.3333H106.019ZM116.008 40.3333V53.6667H112.678V57H106.019V53.6667H109.349V40.3333H116.008Z"
            fill="white"
          />
          <path
            d="M122.667 57V53.6667H119.338V43.6667H122.667V40.3333H139.315V43.6667H142.645V50.3333H125.997V53.6667H139.315V57H122.667ZM125.997 47H135.986V43.6667H125.997V47Z"
            fill="white"
          />
          <path
            d="M149.304 57V53.6667H145.974V43.6667H149.304V40.3333H165.952V43.6667H169.282V50.3333H152.634V53.6667H165.952V57H149.304ZM152.634 47H162.622V43.6667H152.634V47Z"
            fill="white"
          />
          <path
            d="M182.6 57V43.6667H175.941V40.3333H182.6V33.6667H189.259V40.3333H195.919V43.6667H189.259V57H182.6Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.3005 0H26.6368V9.33333H21.3095V6.66667H18.6458V4H7.99105V6.66667H5.32737V9.33333H2.66368V12H0V14.6667H2.66368V17.3333H18.6458V14.6667H21.3095V12H26.6368V21.3333H23.9732V24H21.3095V29.3333H7.99105V32H5.32737V34.6667H2.66368V37.3333H0V53.3333H2.66368V56H5.32737V58.6667H7.99105V61.3333H21.3095V58.6667H23.9732V56H26.6368V53.3333H29.3005V34.6667H26.6368V32H23.9732V24H26.6368V21.3333H29.3005V8H34.6279V10.6667H37.2916V13.3333H39.9553V24H42.6189V26.6667H45.2826V32H41.2871V34.6667H38.6234V37.3333H35.9597V40H33.296V56H35.9597V58.6667H38.6234V61.3333H41.2871V64H54.6055V61.3333H57.2692V58.6667H59.9329V56H62.5966V40H59.9329V37.3333H57.2692V34.6667H54.6055V32H47.9463V26.6667H45.2826V24H42.6189V13.3333H39.9553V10.6667H37.2916V8H34.6279V5.33333H29.3005V0ZM54.6055 34.6667V37.3333H57.2692V40H59.9329V56H57.2692V58.6667H54.6055V61.3333H41.2871V58.6667H38.6234V56H35.9597V40H38.6234V37.3333H41.2871V34.6667H54.6055ZM23.9732 32H21.3095H7.99105V34.6667H5.32737V37.3333H2.66368V53.3333H5.32737V56H7.99105V58.6667H21.3095V56H23.9732V53.3333H26.6368V34.6667H23.9732V32ZM21.3095 12H18.6458V14.6667H2.66368V12H5.32737V9.33333H7.99105V6.66667H18.6458V9.33333H21.3095V12Z"
            fill="white"
          />
          <path
            d="M18.6457 6.66675H7.99094V9.33341H5.32726V12.0001H2.66357V14.6667H18.6457V12.0001H21.3094V9.33341H18.6457V6.66675Z"
            fill="#B5FFE0"
          />
          <path
            d="M23.973 32H7.99094V34.6667H5.32726V37.3333H2.66357V53.3333H5.32726V56H7.99094V58.6667H21.3094V56H23.973V53.3333H26.6367V34.6667H23.973V32Z"
            fill="url(#paint0_linear_834_105447)"
          />
          <path
            d="M54.6057 34.6667H41.2873V37.3334H38.6236V40.0001H35.96V56.0001H38.6236V58.6667H41.2873V61.3334H54.6057V58.6667H57.2694V56.0001H59.9331V40.0001H57.2694V37.3334H54.6057V34.6667Z"
            fill="url(#paint1_linear_834_105447)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.6456 34.6667H15.9819V37.3334H18.6456V42.6667H21.3093V45.3334H23.973V42.6667H21.3093V37.3334H18.6456V34.6667ZM51.9417 37.3334H49.278V40.0001H51.9417V45.3334H54.6053V48.0001H57.269V45.3334H54.6053V40.0001H51.9417V37.3334Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_834_105447"
              x1="12.8578"
              y1="60.6604"
              x2="15.2116"
              y2="29.417"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF2B40" />
              <stop offset="1" stop-color="#FFB0A5" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_834_105447"
              x1="46.1542"
              y1="63.3272"
              x2="48.508"
              y2="32.0838"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF2B40" />
              <stop offset="1" stop-color="#FFB0A5" />
            </linearGradient>
          </defs>
        </svg>
        <div tw="absolute max-w-[900px] top-24 left-24 flex flex-col">
          <h1 tw="text-white text-6xl font-bold"> {title} </h1>
          <p tw="text-white text-5xl font-bold">{description}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Space Grotesk",
          data: fontBoldData,
          weight: 800,
        },
        {
          name: "Space Grotesk",
          data: fontRegularData,
          weight: 400,
        },
        {
          name: "Space Grotesk",
          data: fontSemiBoldData,
          weight: 600,
        },
      ],
    }
  );
}

export default TweetOgHandler;
