import React, { useState } from "react";
import "./App.css";
import Company from "./features/companies/interfaces/company";
import { useGetCompaniesQuery } from "./api";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const numberOfEmployees = ["1-10", "11-50", "51-100", "101-250", "250+"];

const revenues = [
  "$0-$1M",
  "$1M-$20M",
  "$20M-$50M",
  "$50M-$100M",
  "$100M-$250M",
  "$250M-$500M",
  "$500M-$1B",
  "$1B+",
];

const fieldsOfWork = [
  "Civil Engineering",
  "Architectural Design",
  "Project Management",
  "Structural Engineering",
  "Construction Management",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Surveying",
  "Environmental Engineering",
  "Construction Estimating",
];

function App() {
  const [shouldShowAllStates, setShouldShowAllStates] = useState(false);
  const [shouldShowAllRevenues, setShouldShowAllRevenues] = useState(false);
  const [shouldShowAllFieldsOfWork, setShouldShowAllFieldsOfWork] =
    useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company>();
  const { data: companies, error, isLoading } = useGetCompaniesQuery();

  function showMore__States() {
    setShouldShowAllStates((prev) => !prev);
  }

  function showMore__Revenues() {
    setShouldShowAllRevenues((prev) => !prev);
  }

  function showMore__FieldOfWork() {
    setShouldShowAllFieldsOfWork((prev) => !prev);
  }

  function handleSelectCompany(company: Company) {
    setCurrentCompany(company);
  }

  return (
    <div className="App">
      <div className="flex-container">
        <div className="flex-section filters-column">
          <header className="header-container">DASHBOARD</header>
          <section className="filters-container">
            <div className="filter-group input-group">
              <label htmlFor="company-name">COMPANY NAME</label>
              <input
                type="text"
                id="company-name"
                name="company"
                placeholder="Schmeler Inc"
              />
            </div>
            <div className="filter-group states-group">
              <h2>States</h2>
              {states
                .slice(0, shouldShowAllStates ? states.length : 6)
                .map((el) => (
                  <label htmlFor="al">
                    {el}
                    <input type="checkbox" id="{el}" name="states" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              <button className="show-more" onClick={() => showMore__States()}>
                show {shouldShowAllStates ? "less" : "more"}
              </button>
            </div>
            <div className="filter-group employees-group">
              <h2>Number of Employees</h2>
              {numberOfEmployees.map((el) => (
                <label htmlFor="al">
                  {el}
                  <input
                    type="checkbox"
                    id="{el}"
                    name="states"
                    checked={el === "11-50"}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
            <div className="filter-group work-group">
              <h2>Field of Work</h2>
              {fieldsOfWork
                .slice(0, shouldShowAllFieldsOfWork ? fieldsOfWork.length : 6)
                .map((el) => (
                  <label htmlFor="al">
                    {el}
                    <input type="checkbox" id="{el}" name="states" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              <button
                className="show-more"
                onClick={() => showMore__FieldOfWork()}
              >
                show {shouldShowAllFieldsOfWork ? "less" : "more"}
              </button>
            </div>
            <div className="filter-group revenues-group">
              <h2>Revenue</h2>
              {revenues
                .slice(0, shouldShowAllRevenues ? revenues.length : 6)
                .map((el) => (
                  <label htmlFor="al">
                    {el}
                    <input type="checkbox" id="{el}" name="states" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              <button
                className="show-more"
                onClick={() => showMore__Revenues()}
              >
                show {shouldShowAllRevenues ? "less" : "more"}
              </button>
            </div>
          </section>
          <section className="button-container">
            <button className="button apply-button">Apply</button>
            <button className="button clear-button">Clear All</button>
          </section>
        </div>
        <div className="flex-section results-column">
          <header className="header-container">
            RESULTS: <b>5000</b>
          </header>
          {!!error && <h2>Error loading company data.</h2>}
          {isLoading && <h2>Loading...</h2>}
          {companies &&
            companies.map((el) => (
              <div
                className="results-item"
                onClick={() => handleSelectCompany(el)}
              >
                <div className="results-item-text-section">
                  <p className="company-name">{el.company_name}</p>
                  <p>{el.field_of_work}</p>
                </div>
                <div className="results-item-state-tag">
                  <span>{el.state}</span>
                </div>
              </div>
            ))}
        </div>
        <div
          className={
            "flex-section info-column" +
            (currentCompany?.company_name ? "" : " empty-state")
          }
        >
          {!currentCompany?.company_name ? (
            <section className="empty-state-message">
              <p>SELECT A COMPANY</p>
              <p>Select a company from the list to see detailed info</p>
            </section>
          ) : (
            currentCompany && (
              <section className="company-info">
                <header className="company-title">
                  <h2>{currentCompany.company_name}</h2>
                  <p>{currentCompany.field_of_work}</p>
                </header>
                <section className="company-general">
                  <p>GENERAL INFO</p>
                </section>
                <section className="company-tags">
                  <p>TAGS ({currentCompany.tags.length})</p>
                </section>
              </section>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
