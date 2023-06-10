//TODO: replace and delete the stuff outside the method later

import { JobsPageRowData } from "src/lib/jobsList/jobsList";

function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

let dummyJobs: JobsPageRowData[] = [
  {
    id: 311699,
    companyName: "Lenscan Medical Inc",
    jobName: "Marketing Associate",
    appDeadline: "May 16, 2023",
    division: "Divisional Office",
    openings: 1,
    city: "Waterloo",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "The Marketing Associate is accountable for supporting in all promotion and marketing activities. This position assists in the creation of a strategic marketing plan in consultation with the leadership team. Works with teams to structure CRM system to build campaigns and programs to increase the sale of products, solutions, and services.",
    jobResponsibilities:
      "<ul>\n  \n\t \n <li>Develops related digital content for multiple platforms, such as websites, social media, email marketing, product descriptions, videos, and blogs</li>\n\t \n <li>Assist in the preparation for a promotion and marketing shared calendar, including all marketing/advertising initiative, updating accordingly</li>\n\t \n <li>Assist in the designs, builds, and maintains our social media presence</li>\n\t \n <li>Develop content for social media accounts, preparing content calendars</li>\n\t \n <li>Responds to social media customer inquiries, relays customer issues/feedback to team</li>\n\t \n <li>Understand our customers, target audience, and brand to assist with developing audience-relevant content</li>\n\t \n <li>Develop related content for multiple platforms, such as websites, email marketing, product descriptions, videos, and blogs</li>\n\t \n <li>Organize specials and promotions in accordance with strategic marketing plan</li>\n \n</ul>",
    requiredSkills:
      "<ul>\n  \n\t \n <li>Understanding of marketing elements (including traditional and digital marketing such as SEO/social media etc.) and market research methods</li>\n\t \n <li>Attention to detail and ability to lead several projects simultaneously</li>\n\t \n <li>Strong analytical and critical thinking skills</li>\n\t \n <li>Must be able to interact with end-users in a professional and service-centered manner</li>\n\t \n <li>Solid computer skills, including MS Office, marketing software (CRM) and applications (Web analytics, Google AdWords etc.)</li>\n\t \n <li>Experience of graphic software like Photoshop and Coreldraw</li>\n\t \n <li>Exceptional communication and writing skills</li>\n \n</ul>",
    compensationAndBenefitsInformation: "",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 313958,
    companyName: "McRae Integration Ltd",
    jobName: "Junior Automation Specialist In Training",
    appDeadline: "May 16, 2023",
    division: "Head Office",
    openings: 1,
    city: "Toronto",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      'Working as part of a project team, the&nbsp;<strong>Junior Automation Specialist In Training</strong>&nbsp;is involved with PLC and HMI application development and updating electrical schematics. Depending on the project and individual, there may also be opportunities to install the software at a client\'s site. \n<br>\n \n<br>\n<strong>What McRae Can Offer</strong> \n<br>\n- &nbsp;Competitive salary \n<br>\n- &nbsp;Open, friendly and casual work environment \n<br>\n- &nbsp;Flexible working hours \n<br>\n \n<br>\n<strong>About McRae</strong> \n<br>\nWe are experts in controls and automation within the beverage, brewing, food, material handling and pharmaceutical industries. We are seeking motivated individuals looking for a rewarding employment opportunity to get involved in the industries we serve. &nbsp;We offer a work environment where you will have autonomy and freedom, plus the added benefit of mentoring from industry experts when you require it. \n<br>\n \n<br>\nMcRae Integration is a controls systems integrator, project management and engineering company that is made up of professional, knowledgeable and experienced people. \n<br>\n \n<br>\nIt is our goal to ensure that our customers succeed. We provide the resources and support required to successfully design, develop and implement each project we are commissioned to complete. For more information, please visit our website at <a href="http://www.mcraeintegration.com">www.mcraeintegration.com</a>.',
    jobResponsibilities:
      "<u><strong>Job Responsibilities:</strong></u> \n<br>\n \n<br>\nAs a <strong>Junior Automation Specialist In Training</strong>&nbsp;reporting to the Technical Manager, you may be responsible for: \n<br>\n- &nbsp;Assisting with preparation of electrical designs for control panels \n<br>\n- &nbsp;Performing in-house panel assembly and installation verification \n<br>\n- &nbsp;Developing PLC and HMI applications \n<br>\n- &nbsp;Installing the applications at our client's facility \n<br>\n- &nbsp;Preparing documentation (design documents as well as end-user manuals)",
    requiredSkills:
      "<strong>Minimum Qualifications</strong> \n<br>\n- &nbsp;Studying towards a Bachelor's Degree in Electrical, Mechatronics, Mechanical, or Systems Design Engineering (preferred; other disciplines will be considered depending on experience) \n<br>\n- &nbsp;Legally eligible to work in Canada \n<br>\n- &nbsp;A strong desire to learn, coupled with the ability to self-teach and learn on the job \n<br>\n \n<br>\n<strong>Beneficial Qualifications</strong> \n<br>\n- &nbsp;Experience in process control and automation \n<br>\n- &nbsp;Experience working in an industrial environment \n<br>\n- &nbsp;Experience with programmable logic controllers (PLCs): Allen-Bradley (SLC, PLC-5, &amp; Logix Families) preferred (GE, Siemens, Omron are also acceptable) \n<br>\n- &nbsp;Experience with HMI and/or SCADA development (FactoryTalk View ME/SE preferred; Wonderware, iFIX are also acceptable) \n<br>\n- &nbsp;Experience with database development (SQL Server preferred; Oracle is also acceptable) \n<br>\n- &nbsp;Development experience with C#, vb.net, Java, or other high level languages would be considered an asset",
    compensationAndBenefitsInformation:
      "McRae's office has on-premises parking for all employees.&nbsp; There is an employee gym with showers, as well as table tennis. \n<br>\n \n<br>\nWe also provide hot beverages (espresso, coffee, tea, hot chocolate) for employees and guests. \n<br>\n \n<br>\nOccasional staff lunches (company provided).",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 313971,
    companyName: "Department of National Defence",
    jobName: "Research Assistant",
    appDeadline: "May 16, 2023",
    division: "Defence Research & Development Canada - Ottawa",
    openings: 1,
    city: "Ottawa",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "A second, third, or fourth year co-op student is required, from May 2023 to the end of August 2023, to work on emerging Electronic Attack (EA) technology. Preference will be given to students with Canadian citizenship. The candidate needs to be living in Canada for at least five years to pass the Enhanced Reliability Clearance to work at the DRDC Ottawa Research Centre.",
    jobResponsibilities:
      '<table border="1" cellpadding="0" cellspacing="3" style="width:1440px;" width="1440">\n  \n\t \n <tbody>\n   \n\t\t \n  <tr>\n    \n\t\t\t \n   <td style="width:75.0%;">1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GENERAL INFORMATION<br>\n\t\t\tElectronic Warfare (EW) is the ability to manipulate the electromagnetic spectrum for defensive or offensive purposes. Traditionally, electronic warfare has been composed of three primary activities:\n\t\t\t \n    <ul>\n      \n\t\t\t\t \n     <li>Electronic attack: such as jamming enemy communications or radar to&nbsp; suppress enemy electronic sensors either temporarily or permanently</li>\n\t\t\t\t \n     <li>Electronic protection: is a set of measures designed to protect personnel, facilities, and equipment from enemy electronic attack actions</li>\n\t\t\t\t \n     <li>Electronic support: involves collecting, intercepting and analyzing enemy signals to gain intelligence of the threat</li>\n\t\t\t \n    </ul>\n\t\t\t2.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DETAILED STATEMENT OF WORK<br>\n\t\t\tThe student will work on the analysis, simulation, and development of electronic attack techniques, which shall include the following tasks:<br>\n\t\t\t<br>\n\t\t\t2.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TECHNOLOGY REVIEW\n\t\t\t \n    <ul>\n      \n\t\t\t\t \n     <li>Learn EW basics</li>\n\t\t\t\t \n     <li>Study the concepts and methodologies of EA</li>\n\t\t\t \n    </ul>\n\t\t\t2.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TECHNOLOGY DEVELOPMET\n\n\t\t\t \n    <ul>\n      \n\t\t\t\t \n     <li>Investigate the methods to defeat cognitive Radio Frequency (RF) sensors</li>\n\t\t\t\t \n     <li>Develop the corresponding EA techniques</li>\n\t\t\t\t \n     <li>Evaluate the effectiveness of the developed techniques</li>\n\t\t\t \n    </ul>\n\t\t\t2.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TESTING AND SIMULATION\n\n\t\t\t \n    <ul>\n      \n\t\t\t\t \n     <li>Test and debug the software and algorithm implementations</li>\n\t\t\t\t \n     <li>Demonstrate the simulation result</li>\n\t\t\t \n    </ul>\n\t\t\t2.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FINAL REPORT\n\n\t\t\t \n    <ul>\n      \n\t\t\t\t \n     <li>A final report (10-20 pages) needs to be submitted to the supervisor before the end of the co-op term</li>\n\t\t\t \n    </ul>\n\t\t\t</td>\n\t\t \n  </tr>\n\t \n </tbody>\n \n</table>',
    requiredSkills:
      "The candidate needs to perform coding and software development. The following experiences are required:\n \n<ul>\n  \n\t \n <li>Experience in MATLAB, C++, and/or JavaScript</li>\n\t \n <li>Experience in software testing and debugging</li>\n \n</ul>\nExperience in research and scientific writing",
    compensationAndBenefitsInformation: "",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 313975,
    companyName: "Globotech Inc",
    jobName: "Junior Project Engineering Co-Op",
    appDeadline: "May 16, 2023",
    division: "Divisional Office",
    openings: 1,
    city: "Tiverton",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "<strong>Job Overview:</strong> \n<br>\nGlobotech provides a wide range of engineering services and solutions to the Nuclear Power Industry and is currently supporting Ontario's refurbishment and modification projects at Bruce Power. Globotech is committed to delivering <em>fit for purpose </em>solutions without compromising the Quality, Health, and Safety of our Clients. We strive to be an integrated partner and building long term relations with our clients and stake holders as our core values. Our Team's diverse experiences and technical competency combined with projects execution experiences enables us to offer technical solutions to our clients which meet their business and project objectives. We deliver safe and quality product within Client's schedule and cost constrains by <em>Doing It Right the First Time</em>. Our team of professionals is credited with in-depth knowledge of the Nuclear Industry's regulations, standards and license requirements in Canada. Globotech's multi-discipline organizational structure combined with cross functional experiences with CANDU technology put our firm on a prime position to offer a wide spectrum of cost-effective solutions to our clients. \n<br>\n \n<br>\n<strong>Position Overview:</strong> \n<br>\nGlobotech is excited to offer multiple&nbsp;<strong>Engineering Co-op/Developmental Student (All Disciplines)&nbsp;</strong>opportunities in the Bruce County&nbsp;locations. Work terms are&nbsp;<strong>four (4) or eight (8)&nbsp;months</strong>&nbsp;and start in <strong>May 2023</strong><strong>.&nbsp;</strong>The successful candidate(s) will exhibit uncompromising integrity and commitment to upholding corporate values, and the Bruce Power Code of Business Conduct. \n<br>\n \n<br>\nCo-Op position conditional on successfully obtaining mandatory security clearance.",
    jobResponsibilities:
      "<strong>Job Responsibilities:</strong>\n\n \n<ul>\n  \n\t \n <li>Assist with managing multiple projects simultaneously and prioritize projects in accordance with deadline requirements</li>\n\t \n <li>Analyze and interpret all project related documents (electrical, mechanical, architectural, etc.) to accurately quantify all controls and instrumentation scope items provided in bid package</li>\n\t \n <li>Produce accurate control system and control panel design submittals and schedules</li>\n\t \n <li>Support the planning, prioritizing, and reviewing the technical plans for engineering/maintenance of the production and facility equipment including the preparation of project plans, schedules, budgets and proposals</li>\n\t \n <li>Assist with providing day-to-day support to plant operations, which is compromised of Engineering, Common Services, Maintenance Execution, Nuclear Training.</li>\n\t \n <li>Interface with station personnel including project teams, Engineering, Operations and Maintenance to support planning, scoping and risk management for outages.</li>\n \n</ul>",
    requiredSkills:
      "<strong>Qualifications:</strong>\n\n \n<ul>\n  \n\t \n <li>Currently enrolled in a Engineering University Degree (Mechanical/Electrical/Mechatronics/Nuclear preferred)</li>\n\t \n <li>Have completed a minimum of 1st year at a University by the start of the opportunity.</li>\n\t \n <li>Have a minimum average of 70% cumulative GPA.</li>\n\t \n <li>Be returning to full-time studies in the same program following the completion of the work term OR require the work term or co-op placement to graduate.</li>\n \n</ul>\n<strong>Our promise to you:</strong>\n\n \n<ul>\n  \n\t \n <li>We care about the safety and the well-being of our employees. It is our utmost priority.</li>\n\t \n <li>A supportive work environment where you can be your best every day.</li>\n\t \n <li>Opportunities to stretch and develop in our diverse lines of business.</li>\n\t \n <li>Provide spaces for innovative thinking and solutions.</li>\n\t \n <li>Offer different ways for you to give back to communities where we operate.</li>\n\t \n <li>We support employment equity and diversity.</li>\n \n</ul>",
    compensationAndBenefitsInformation:
      "The compensation range for these positions is&nbsp;$22.00 - $24.00 per hour and will commensurate with experience. \n<br>\n&nbsp;",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 314011,
    companyName: "Ontario Ministry of Health",
    jobName: "Financial Officer",
    appDeadline: "May 16, 2023",
    division: "Health Capital Division",
    openings: 3,
    city: "Toronto",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "Bring your financial and analytical skills to the Ministry of Health and Long-Term Care, Health Capital Investment Branch (HCIB) to help deliver on the province of Ontario's high profile portfolio of health infrastructure projects.&nbsp; We build quality facilities that support the delivery of excellent healthcare to the people of Ontario. \n<br>\n&nbsp; \n<br>\nHCIB is currently delivering financial oversight on over 100 construction projects in the hospital and community sectors. \n<br>\n&nbsp; \n<br>\nFollowing the completion of a health capital project, HCIB completes a settlement analysis to ensure that funding provided was sufficient and used for its intended purpose.&nbsp;&nbsp; Our Co-op students play a key role in the financial reconciliations of projects at this stage. \n<br>\n&nbsp; \n<br>\nA great advantage to joining us is that all Ontario ministries carry out similar financial activities, so that skills and knowledge learned in any ministry and location are excellent preparation for future work in government.&nbsp;",
    jobResponsibilities:
      "<ul>\n  \n\t \n <li>Provide financial analysis surrounding the settlement financial aspects of health infrastructure projects, including analysis of project cost, ministry contributions and financing solutions;</li>\n\t \n <li>Participate in joint discussions between internal and external stakeholders on issues related to the completion of capital projects;</li>\n\t \n <li>Provide advice, support and briefings to senior management as part of the resolution of emerging financial issues;</li>\n\t \n <li>Prepare complex decision making notes, briefing notes and correspondence; and</li>\n\t \n <li>Participate on cross-functional teams and working groups.</li>\n \n</ul>",
    requiredSkills:
      "<strong>Knowledge of Business and Finance:</strong>\n\n \n<ul>\n  \n\t \n <li>Short to long range financial planning, forecasting, and budget allocation</li>\n\t \n <li>Performing calculations, conducting analysis, and preparing reports&nbsp;</li>\n \n</ul>\n<strong>Oral and Written Communication Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You can draft correspondence, prepare business cases, reports and presentations</li>\n\t \n <li>You can present information/advice in a clear, concise, and accurate manner&nbsp;</li>\n \n</ul>\n<strong>Research and Analytical Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You can collect, organize, and analyze data to identify trends, issues, and opportunities</li>\n\t \n <li>You can identify key business objectives and establish appropriate organizational goals</li>\n\t \n <li>You can make recommendations to address gaps and report on results&nbsp;</li>\n \n</ul>\n<strong>Project Management and Organizational Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You are able to plan, organize, and manage multiple tasks and projects with competing deadlines&nbsp;&nbsp;</li>\n \n</ul>\n<strong>Teamwork Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You can establish and maintain effective working relationships with colleagues and stakeholders at varying levels</li>\n\t \n <li>You can participate and contribute to committees and projects&nbsp;</li>\n \n</ul>\n<strong>Computer Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You are proficient in common software applications, such as Excel, Word and Acces. Draft documents and reports, prepare presentations, conduct analysis, and perform research on the internet &nbsp;</li>\n \n</ul>",
    compensationAndBenefitsInformation: "",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 314012,
    companyName: "Ontario Ministry of Health",
    jobName: "Information Management Analyst",
    appDeadline: "May 16, 2023",
    division: "Health Capital Division",
    openings: 2,
    city: "Toronto",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "The Ontario Public Service is looking for people with strengths in information management as well as database maintenance. In this role where you will provide data management, analysis and application support, assist in the implementation of the Section's data technology requirements, and support the implementation of the Division's information technology applications.",
    jobResponsibilities:
      "<strong>What can I expect to do in this role?</strong>\n\n \n<ul>\n  \n\t \n <li>Support the development of database improvements and development</li>\n\t \n <li>Improve and import historical data sources into the current Access database</li>\n\t \n <li>Assist in the development of data processes, tools and information monitoring and reporting methods</li>\n\t \n <li>Coordinate, organize and maintain project work plans and historical documentation system</li>\n\t \n <li>Support and assist project teams and working groups to develop data reports</li>\n \n</ul>",
    requiredSkills:
      "<strong>The knowledge and skills we look for that support these activities include:</strong> \n<br>\n&nbsp; \n<br>\n<strong>Technical knowledge:</strong>\n\n \n<ul>\n  \n\t \n <li>You have knowledge of performance measurement, data collection, analysis and synthesis.</li>\n\t \n <li>You have knowledge and skills in MS Access and Excel.</li>\n\t \n <li>You have knowledge of theories, principles and best practices in the field of analytics, information management, data standards, data modelling, data mining and evidence informed decision-making</li>\n \n</ul>\n<strong>Research and Analytical Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You can collect, organize, and analyze data to identify trends, issues, and opportunities</li>\n\t \n <li>You have demonstrated analytical and problem solving skills to plan and conduct assigned projects.</li>\n\t \n <li>You can make recommendations to address gaps and data improvements</li>\n\t \n <li>You have the ability to anticipate, analyse, monitor and assess complex and large scale issues and&nbsp;identify impacts of issues.</li>\n\t \n <li>You have the ability to conduct research, synthesize information, prepare analyses, reports and recommendations.</li>\n \n</ul>\n<strong>Project Management and Organizational Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You are able to plan, organize, and manage multiple tasks and projects with competing deadlines</li>\n \n</ul>\n<strong>Teamwork Skills:</strong>\n\n \n<ul>\n  \n\t \n <li>You can establish and maintain effective working relationships with colleagues and stakeholders at varying levels</li>\n\t \n <li>You can participate and contribute to committees and projects</li>\n \n</ul>",
    compensationAndBenefitsInformation: "",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 314038,
    companyName: "Public Services and Procurement Canada (PSPC)",
    jobName: "Program Clerk",
    appDeadline: "May 16, 2023",
    division: "Science and Parliamentary Infrastructure Branch",
    openings: 1,
    city: "Ottawa",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "&nbsp; \n<br>\nAs a member of the Centre Block Renovation Program, you will be part of the Program Integration Team. You will report to the Program Administrator. This position is responsible for assisting the Program Administrator with the various Administrative, IT, and HR, tasks.&nbsp;",
    jobResponsibilities:
      'Your role&nbsp;as Program Clerk, will mean you will&nbsp;help carry out&nbsp;the following tasks and duties: \n<br>\n&nbsp; \n<br>\nPrepare documents to track completion rates of various administrative and training activities on the Centre Block program \n<br>\n \n<br>\nHelp in the preparation of administrative and corporate documentation for the Senior Director and as required, the Director General including, but not limited to:\n \n<ul>\n  \n\t \n <li>Creating dashboards, tracking completion rates of various administrative and training activities, preparing standard operation procedures, etc.</li>\n\t \n <li>Assist in the process of on-boarding and off-boarding employees</li>\n\t \n <li>Assist in preparing documentation for future media requests or presentations, this includes tracking construction photos and ensuring they are filed in a proper repository, helping to prepare presentations. etc.</li>\n\t \n <li>On top of attending regular program-related meetings, you will also participate at a weekly staff meeting, where you will provide "tips and tricks" to staff on various administrative, IT, and other relevant activities</li>\n \n</ul>',
    requiredSkills:
      'To be admissible you must:\n \n<ul>\n  \n\t \n <li>be a Canadian citizen;</li>\n\t \n <li>be enrolled as a full-time student</li>\n\t \n <li>completion of first year studies</li>\n\t \n <li>be eligible to obtain Security Clearance « Secret »<br>\n\t<strong><em>See website:</em></strong> <a href="http://www.tpsgc-pwgsc.gc.ca/esc-src/personnel/information-eng.html#s1a">http://www.tpsgc-pwgsc.gc.ca/esc-src/personnel/information-eng.html#s1a</a>&nbsp;&nbsp;&nbsp;</li>\n \n</ul>',
    compensationAndBenefitsInformation:
      "<strong>Salary Range: </strong>$15-25 (The rate of pay will be based on the number of post-secondary years successfully completed as well as relevant work experience and is a standard rate for the federal government student placements.) \n<br>\n&nbsp;",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 314039,
    companyName: "Public Services and Procurement Canada (PSPC)",
    jobName: "Junior Project Manager",
    appDeadline: "May 16, 2023",
    division: "Science and Parliamentary Infrastructure Branch",
    openings: 3,
    city: "Ottawa",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "Project Background \n<br>\nPublic Services and Procurement Canada (PSPC), formerly known as Public Works and Government Services Canada, is the department responsible for managing buildings for the Government of Canada. The Science and Parliamentary Infrastructure Branch (SPIB) oversees the day to-day operations and care of the Parliamentary Precinct-for parliamentarians, the Government, and all Canadians-to ensure they are preserved as strong symbols of our history and capable of providing accommodations for continued parliamentary service in the 21st century. \n<br>\n \n<br>\nThe Centre Block (CB) is one of Canada's most recognized and iconic buildings and has been designated a classified heritage building that requires significant rehabilitation and conservation. It is nearly 100 years old and its major equipment and components need to be replaced. \n<br>\n \n<br>\nThe scope of the CB Rehabilitation Program includes a comprehensive rehabilitation of CB and its integrated Peace Tower, along with the completion of the Visitor Welcome Centre (VWC) Complex when the CB building is expected to be vacated. The scope also includes the preparatory work (i.e. enabling projects). All enabling projects must be completed before the complete decommissioning of CB and start of significant construction on the site. Until all parliamentary business is moved from the Centre Block, all work inside and outside the building will need to be coordinated as to minimize disruption within reasonable and acceptable parameters. \n<br>\n \n<br>\nRehabilitating the Centre Block will be PSPC's largest and most complex heritage rehabilitation project ever. The building suffers from crumbling mortar, aging water pipes and outdated mechanical, electrical and safety systems. It also suffers from technology and security demands that have outgrown the nearly century-old building. \n<br>\n \n<br>\nDuring this work term, there will be a large focus on heritage and environmental aspects of the program. The heritage and approvals team is responsible for coordinating all approval submissions with Authorities Having Jurisdiction on the project, e.g. National Capital Commission (NCC) and Federal Heritage Building Review Office (FHBRO). The team provides heritage conservation recommendations in partnership with the construction manager and design consultants. Environmentally the team is responsible for monitoring and mitigating the environmental effect throughout the duration of the project. The PSPC team is comprised of engineering and architectural professionals who are experts in the fields of architecture, interior design, structure, seismic, sustainability, mechanical and electrical design. The team also interacts regularly with the construction management team and design consultant. \n<br>\nThis offers an excellent opportunity to become familiar with the Federal Government policies related to the field of heritage conservation while acquiring practical experience in project management of the rehabilitation of Canada's most recognized and iconic buildings.",
    jobResponsibilities:
      "Description of Duties: Key tasks by the Junior Project Manager would include but not be limited to the following: \n<br>\n• Preparing meeting materials \n<br>\n• Taking meeting notes and then completing a Record of Discussion (RoD) and /or Meeting Minutes (e.g. Environmental Team Meetings &amp; Environmental Management Plan (EMP) notes &amp; RoD's and Conservation Management Team (CMT) meeting minutes) \n<br>\n• Provide assistance with onsite reviews (environmental reviews) \n<br>\n• Support project manager with daily tasks including; setting up meetings, sending out various emails to project team members on behalf of the Project Manager. \n<br>\n• Reviewing &amp; providing comments on various documents. \n<br>\n• Tracking down various documents on GC docs. \n<br>\n• Create Excel tables and manage Heritage Glossaries. \n<br>\n• Support &amp; assist with both electronic &amp; paper filing. \n<br>\n• Attend Project Meetings with the Project Manager &amp; assist with taking notes.",
    requiredSkills:
      '<strong>Skills Required: </strong> \n<br>\nTo be admissible you must:\n \n<ul>\n  \n\t \n <li>be a Canadian citizen;</li>\n\t \n <li>be enrolled as a full-time student</li>\n\t \n <li>completion of first year studies</li>\n\t \n <li>be eligible to obtain Security Clearance « Secret »<br>\n\t<strong><em>See website:</em></strong> <a href="http://www.tpsgc-pwgsc.gc.ca/esc-src/personnel/information-eng.html#s1a">http://www.tpsgc-pwgsc.gc.ca/esc-src/personnel/information-eng.html#s1a</a>&nbsp;&nbsp;&nbsp;</li>\n \n</ul>',
    compensationAndBenefitsInformation:
      "<strong>Salary Range: </strong>$15-25 (The rate of pay will be based on the number of post-secondary years successfully completed as well as relevant work experience and is a standard rate for the federal government student placements.) \n<br>\n&nbsp;",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 314040,
    companyName: "Public Services and Procurement Canada (PSPC)",
    jobName: "Assistant Project Manager",
    appDeadline: "May 16, 2023",
    division: "Science and Parliamentary Infrastructure Branch",
    openings: 6,
    city: "Ottawa",
    country: "Canada",
    industryTag: "",
    keywords: [],
    jobSummary:
      "Public Services and procurement Canada (PSPC), formerly known as Public Works and Government Services Canada, is the department responsible for managing buildings for the Government of Canada. The Science and Parliamentary Infrastructure Branch (SPIB) oversees the day to-day operations and care of the Parliamentary Precinct-for parliamentarians, the Government, and all Canadians-to ensure they are preserved as strong symbols of our history and capable of providing accommodations for continued parliamentary service in the 21st&nbsp;century. \n<br>\n \n<br>\nThe Centre Block (CB) is one of Canada's most recognized and iconic buildings and has been designated a classified heritage building that requires significant rehabilitation and conservation. It is nearly 100 years old and its major equipment and components need to be replaced. \n<br>\nThe scope of the CB Rehabilitation Project includes a comprehensive rehabilitation of CB and its integrated Peace Tower, along with the completion of the Parliamentary Welcome Centre (PWC) Complex when the CB building is expected to be vacated. The scope also includes the preparatory work (i.e. enabling projects). \n<br>\n \n<br>\nRehabilitating the Centre Block will be PSPC's largest and most complex heritage rehabilitation project ever. The building suffers from crumbling mortar, aging water pipes and outdated mechanical, electrical and safety systems. It also suffers from technology and security demands that have outgrown the nearly century-old building. \n<br>\n \n<br>\nDuring this work term, the main focus will be implementing the construction project.&nbsp; The PSPC construction management is responsible for managing the construction management firm hired to complete the work.&nbsp; The PSPC team is comprised of engineering and architectural professionals who are experts in the fields of architecture, interior design, structure, seismic, sustainability, mechanical and electrical design.&nbsp; The team also interacts regularly with the heritage and conservation team. \n<br>\n \n<br>\nThis offers an excellent opportunity to become familiar with the Federal Government policies related to the field of heritage conservation while acquiring practical experience in project management of the rehabilitation of Canada's most recognized and iconic buildings.&nbsp; \n<br>\n&nbsp;",
    jobResponsibilities:
      "<strong>Description of Duties: </strong>Key tasks by the Assistant Project Manager would include but not be limited to the following:\n\n \n<ol>\n  \n\t \n <li>Assist in the provision of project management services by helping the SPIB team coordinate Consultant design activities and Construction Manager activities.</li>\n\t \n <li>Review Consultant construction drawing, specification, and other project deliverables.</li>\n\t \n <li>Help coordinate minor projects and investigations.</li>\n\t \n <li>Help coordinate and review Consultant investigations and inspections.</li>\n\t \n <li>Attend and participate in Design Meetings, Construction Planning Meetings, and Technical and Lean Construction &amp; Design Workshops</li>\n\t \n <li>Meeting secretary delivering/drafting/editing official project meeting minutes.</li>\n\t \n <li>Assist the project management team with scope, schedule, cost oversight, program integration, and administrative tasks.</li>\n\t \n <li>Assisting with the preparation of project briefs and presentation decks.</li>\n\t \n <li>Researching special subjects, documentation and drawings.</li>\n\t \n <li>Corresponding with clients, contractors, consultants, PSPC and other team members on behalf of the project manager.</li>\n \n</ol>",
    requiredSkills:
      '<strong>Skills Required: </strong> \n<br>\nTo be admissible you must:\n \n<ul>\n  \n\t \n <li>be a Canadian citizen;</li>\n\t \n <li>be enrolled as a full-time student</li>\n\t \n <li>completion of first year studies</li>\n\t \n <li>be eligible to obtain Security Clearance « Secret »<br>\n\t<strong><em>See website:</em></strong> <a href="http://www.tpsgc-pwgsc.gc.ca/esc-src/personnel/information-eng.html#s1a">http://www.tpsgc-pwgsc.gc.ca/esc-src/personnel/information-eng.html#s1a</a>&nbsp;&nbsp;&nbsp;</li>\n \n</ul>',
    compensationAndBenefitsInformation:
      "<strong>Salary Range: </strong>$15-25 (The rate of pay will be based on the number of post-secondary years successfully completed as well as relevant work experience and is a standard rate for the federal government student placements.) \n<br>\n&nbsp;",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
  {
    id: 314080,
    companyName: "AMC Language School",
    jobName: "English Teaching",
    appDeadline: "May 16, 2023",
    division: "Tainan Office",
    openings: 1,
    city: "Tainan City",
    country: "Taiwan",
    industryTag: "",
    keywords: [],
    jobSummary:
      "AMC Language School is a legal educational institution with a good reputation of 30 years. \n<br>\n \n<br>\nTeach students from elementary to high school, English (speaking and listening). \n<br>\n \n<br>\nFor students in elementary school, the interns will need to plan creative activities and games in order to engage children in classes. Will mainly be required to train students in their English communication skills (Speaking &amp; Listening). \n<br>\nFor students in junior&amp;high school, interns will choose and discuss topics to build their confidence in their conversation skills. \n<br>\n \n<br>\nExcellent international opportunity to gain teaching and leadership skills in a new culture.&nbsp;We will provide class materials while the interns only need to plan how to teach in class. Support for the interns will be provided - both in their work tasks and transition to living abroad.&nbsp;&nbsp; \n<br>\n \n<br>\n1. 35hr/week&nbsp; \n<br>\n2. According to the schedule, sometimes the interns need to work on Saturdays. But the interns still have 2 days off each week.",
    jobResponsibilities:
      "For students in elementary school, the interns will need to plan creative activities and games in order to engage children in classes. Will mainly be required to train students in their English communication skills (Speaking &amp; Listening). \n<br>\n \n<br>\nFor students in junior&amp;high school, interns will choose and discuss topics to build their confidence in their conversation skills. \n<br>\n \n<br>\n- Customize learning strategies to enhence Asian students learning experience. \n<br>\n- Learn differences in education system between Asian and Western countries through interaction. \n<br>\n- Experience enthusiastic and distinctive life in Taiwan. Acquire creativity for career in the future.",
    requiredSkills:
      "Proficient in both speaking and listening English (like a native speaker).",
    compensationAndBenefitsInformation:
      "Salary: NT$30,000 (for each month) \n<br>\n \n<br>\nStudents are responsible for the cost of obtaining a work visa (Working Holiday visa).&nbsp; Students must secure a visa in Canada prior to travelling.&nbsp; It is recommended to secure health insurance prior to travelling as well.",
    isBookmarked: true,
    location: "Waterloo, Canada",
  },
];

dummyJobs = dummyJobs.map(x => ({ ...x, location: `${x.country}, ${x.city}` }));

//TODO: End of code to remove

export class ExtensionRequests {
  static async getBookmarkedJobs(): Promise<JobsPageRowData[]> {
    dummyJobs = [...dummyJobs.filter(x => x.isBookmarked)];
    await delay(500);
    return dummyJobs;
  }

  static async onBookmarkJob(id: number): Promise<undefined> {
    const jobIndex = dummyJobs.findIndex(x => x.id === id);
    const previousVal: boolean = dummyJobs[jobIndex]?.isBookmarked ?? false;
    dummyJobs[jobIndex].isBookmarked = !previousVal;
    await delay(500);
    return;
  }
}
