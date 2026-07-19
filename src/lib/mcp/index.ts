import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listCaseStudies from "./tools/list-case-studies";
import getCaseStudy from "./tools/get-case-study";
import listDecisions from "./tools/list-decisions";
import listWriting from "./tools/list-writing";
import getPost from "./tools/get-post";
import listLab from "./tools/list-lab";
import getContact from "./tools/get-contact";

export default defineMcp({
  name: "hinedy-portfolio-mcp",
  title: "Ahmed Hinedy — Portfolio",
  version: "0.1.0",
  instructions:
    "Read-only access to Ahmed Hinedy's portfolio: position, case studies (Evidence), decision principles (How I Decide), blog posts (Writing), lab experiments, and contact info. Start with get_profile for an overview, then list_case_studies / list_decisions / list_writing / list_lab and drill in with get_case_study or get_post.",
  tools: [
    getProfile,
    listCaseStudies,
    getCaseStudy,
    listDecisions,
    listWriting,
    getPost,
    listLab,
    getContact,
  ],
});
