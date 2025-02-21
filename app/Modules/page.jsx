import React from "react";
import PivotGridChart from "./components/pivotGrid";
import Splitter, { Item } from "devextreme-react/splitter";
import { ScrollView } from 'devextreme-react/scroll-view';
const HomePage = () => {
  return (
    <div>
      <h1>Bienvenidos</h1>
      <Splitter height={'100%'}>
        <Item>
          <ScrollView direction="horizontal">
          <PivotGridChart />
          </ScrollView>
        </Item>
        <Item>
          <h2>Chart</h2>
        </Item>
      </Splitter>
    </div>
  );
};
export default HomePage;
