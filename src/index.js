import React from "react";
import { render } from "react-dom";
import MultiSelect from "@khanacademy/react-multi-select";
import { State } from "react-powerplug";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

// Dummy array of test values.
const options = Array.from(new Array(1000), (_, index) => ({
  label: `Item ${index}`,
  value: index
}));

function valueRenderer(selected, options) {
  if (selected.length === 0) {
    return "Slect some...";
  }

  if (selected.length === 1) {
    return selected.label;
  }

  if (selected.length === options.length) {
    return "All selected";
  }

  return `${selected.length} selected`;
}

const sort = (options, selected) => {
  if (selected.length === 0) return options;
  return options.sort((a, b) => {
    if (selected.includes(a.value) && selected.includes(b.value)) {
      if (a.value === b.value) return 0;
      return a.value > b.value;
    }
    
    if (selected.includes(a.value) && !selected.includes(b.value)) return -1;
    return 1;
  });
};

const App = () => (
  <div style={styles}>
    <State initial={{ selected: [], options: options, data: null }}>
      {({ state, setState }) => (
        <MultiSelect
          options={options}
          onSelectedChanged={selected =>
            setState({
              selected: selected,
              options: sort(options, selected)
            })
          }
          valueRenderer={valueRenderer}
          selected={state.selected}
        />
      )}
    </State>
  </div>
);

render(<App />, document.getElementById("root"));
