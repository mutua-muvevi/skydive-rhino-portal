import { AuthProvider } from "./auth/jwt-context";
import { BrowserRouter } from "react-router-dom";

//helmet provider
import { HelmetProvider } from "react-helmet-async";

//redux
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

// @mui
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

//settings
import { SettingsProvider, ThemeSettings } from "./components/settings";
// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import { MotionLazyContainer } from "./components/animate";

//theme
import ThemeProvider from "./themes";
import ThemeLocalization from "./locales/theme-localization";
import SnackbarProvider from "./components/snackbar/snackbar-provider";

// routes
import Router from "./routes";

const App = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AuthProvider>
					<HelmetProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<SettingsProvider>
								<BrowserRouter>
									<ScrollToTop />
									<MotionLazyContainer>
										<ThemeProvider>
											<ThemeSettings>
												<ThemeLocalization>
													<SnackbarProvider>
														<StyledChart />
														<Router />
													</SnackbarProvider>
												</ThemeLocalization>
											</ThemeSettings>
										</ThemeProvider>
									</MotionLazyContainer>
								</BrowserRouter>
							</SettingsProvider>
						</LocalizationProvider>
					</HelmetProvider>
				</AuthProvider>
			</PersistGate>
		</ReduxProvider>
	);
};

export default App;
