import React from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import Item from "./Item";

const Feed = ({ data }) => {
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={data.length}
            scrollToAlignment="start"
            rowRenderer={({ key, index, style, parent }) => {
              const item = data[index];

              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div style={style} className="feed--wrapper">
                    <Item item={item} />
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default Feed;
