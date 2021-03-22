import { BrowserHistory } from "history";
import { configureStore } from "./configureStore";

describe("configureStore", () => {
  it("matches snapshot configureStore", () => {
    expect(configureStore({} as BrowserHistory)).toMatchSnapshot();
  });
});
