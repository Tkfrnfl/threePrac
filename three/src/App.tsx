 import { useSetRecoilState, useRecoilState } from 'recoil';
 import { widthState,refState } from './atom/atom';

import React from "react";
import Dolphin from './components/dolphin';
import Vis from './components/test';
import GridLayout from "react-grid-layout";
import './css/App.css';
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<any|null>(0);
  const [widthAtom,setWidthAtom]=useRecoilState(widthState)
  const [refAtom,setRefAtom]=useRecoilState(refState)
  const layout = [
        { i: "a", x: 0, y: 0, w: 2, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 4, h: 2, static:true },
        { i: "c", x: 10, y: 0, w: 2, h: 2,static: true }
      ];

  React.useEffect(() => {

    // when the component gets mounted
    setWidth(ref.current?.offsetWidth);
    // to handle page resize
    const getwidth = () => {
      setWidth(ref.current?.offsetWidth);
    };
    window.addEventListener("resize", getwidth);
    setWidthAtom(width)
    setRefAtom(ref)
    
    // remove the event listener before the component gets unmounted
    return () => window.removeEventListener("resize", getwidth);
  }, [width]);


  return (
    <ChakraProvider resetCSS>
      <div className="App" ref={ref}  style={{background:"black"}}>
        <div className="App">Hello</div>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={width}
        >
          <div
            style={{
              border: "1px solid red"
            }}
            key="a"
          >
            Width: {width}
            dd:{widthAtom}
            <Dolphin></Dolphin> 
          </div>
          {/* <div
          key="b"
          >
          </div> */}
          <div
            style={{
              border: "1px solid red"
            }}
            key="c"
          >
            Width: {width}
            dd:{widthAtom}
            <Dolphin></Dolphin> 
          </div>
        </GridLayout>
      </div>
    </ChakraProvider>
  );
};

export default App;
