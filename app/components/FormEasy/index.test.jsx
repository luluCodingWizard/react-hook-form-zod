import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormEasy from "../FormEasy";
export function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}
const userJson = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};
test("renders the easy form and submit with valid data", async () => {
  window.fetch = mockFetch(userJson);
  render(<FormEasy />);
  fireEvent.input(screen.getByPlaceholderText("Enter your name"), {
    target: { value: "test my name" },
  });
  fireEvent.input(screen.getByPlaceholderText("Enter your age"), {
    target: { value: 22 },
  });
  fireEvent.input(screen.getByPlaceholderText("Enter your email"), {
    target: { value: "ttest@gmail.com" },
  });

  fireEvent.submit(screen.getByRole("button"));
  await waitFor(() => {
    expect(screen.getByText("Form been Submitted!")).toBeInTheDocument();
  });
});
