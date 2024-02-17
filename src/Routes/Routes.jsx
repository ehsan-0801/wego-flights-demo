import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Components/Home";
import OneWayFlights from "../Components/OneWayFlights";
import RoundTrip from "../Components/RoundTrip";
import MultiCity from "../Components/MultiCity";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <OneWayFlights />,
            },
            {
                path: "/round_trip",
                element: <RoundTrip />,
            },
            {
                path: "/multi_city",
                element: <MultiCity />,
            },
        ]
    },
]);