import { createSlice } from '@reduxjs/toolkit';
import { api } from "../../../api";
import Company from "../interfaces/company";

const companies = [
  {
    company_name: "Conroy - O'Conner",
    address: "60858 Ernest Vista, Verniefurt, South Dakota 38318",
    state: "NH",
    number_of_employees: "1-10",
    field_of_work: "Project Management",
    avg_revenue: "$100M-$250M",
    tags: ["Crane", "Wall"],
  },
  {
    company_name: "Homenick, Leannon and Langworth",
    address: "901 Monahan Cove, East Bonitaborough, Florida 04768-9857",
    state: "ID",
    number_of_employees: "51-300",
    field_of_work: "Mechanical Engineering (HVAC)",
    avg_revenue: "$0-$1M",
    tags: ["Permit", "Engineer", "Blueprint", "Formwork", "Waterproofing"],
  },
  {
    company_name: "Blick, Lakin and Rice",
    address: "34532 Christelle Landing, Loisville, Utah 17162-0470",
    state: "LA",
    number_of_employees: "1-10",
    field_of_work: "Civil Engineering",
    avg_revenue: "$100M-$250M",
    tags: ["HVAC", "Formwork", "Blueprint"],
  },
  {
    company_name: "Daniel - Bernhard",
    address: "215 Jude Junction, Uptonland, Montana 88664-9545",
    state: "VA",
    number_of_employees: "11-50",
    field_of_work: "Construction Management",
    avg_revenue: "$0-$1M",
    tags: ["Concrete", "Framing"],
  },
  {
    company_name: "Sanford, Rath and Kuhlman",
    address: "407 Wiza Well, Fadelstad, Nevada 75846-1165",
    state: "OK",
    number_of_employees: "11-50",
    field_of_work: "Architectural Design",
    avg_revenue: "$0-$1M",
    tags: ["Roofing", "Steel", "Caisson", "HVAC", "Wall"],
  },
  {
    company_name: "Turner - Crooks",
    address: "50968 S Central Avenue, Fort Frankie, Connecticut 78057-6332",
    state: "IA",
    number_of_employees: "51-300",
    field_of_work: "Structural Engineering",
    avg_revenue: "$1B+",
    tags: ["Electrical"],
  },
  {
    company_name: "Wunsch - Gerlach",
    address: "7872 West View, East Bryana, New Hampshire 15775",
    state: "MT",
    number_of_employees: "11-50",
    field_of_work: "Structural Engineering",
    avg_revenue: "$0-$1M",
    tags: [
      "Surveying",
      "Permit",
      "Concrete",
      "Design",
      "Reinforcement",
      "Formwork",
    ],
  },
  {
    company_name: "Gutkowski LLC",
    address: "76532 Mill Street, Andersonchester, Nebraska 52040",
    state: "NJ",
    number_of_employees: "11-50",
    field_of_work: "Project Management",
    avg_revenue: "$20M-$50M",
    tags: ["Design", "Inspection", "Electrical"],
  },
  {
    company_name: "Collins, Schroeder and Turcotte",
    address: "255 Schmeler Valley, Zacharyborough, Georgia 82873",
    state: "HI",
    number_of_employees: "300+",
    field_of_work: "Electrical Engineering",
    avg_revenue: "$1B+",
    tags: [
      "Green Building",
      "Excavation",
      "Engineer",
      "Renovation",
      "Foundation",
    ],
  },
];

interface CompaniesState {
  companies: Company[];
  loading: boolean;
}

const initialState: CompaniesState = {
  companies: companies,
  loading: false,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getCompanies.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      api.endpoints.getCompanies.matchFulfilled,
      (state, action) => {
        state.companies = action.payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      api.endpoints.getCompanies.matchRejected,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default companiesSlice.reducer;
