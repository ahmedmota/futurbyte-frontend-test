import websiteimg from "../../public/websiteimg.png";

module.exports = {
    bannerContent: {
        title: "Full-Scale Custom Software & Business Management Solutions",
        description: "From custom software development services to DevOps and more, our team of creative artists, designers, developers, and growth experts will deliver top-tier tech solutions for you.",
        button_label: "Schedule Free Consultancy",
        button_link: null,
    },
    servicesContent: [
        {
          title: "Website Development",
          description: "Our web development services focus on exceptional UI/UX and intuitive functionality for websites. We build custom websites that are conversion-focused, helping our clients achieve their business potential.",
          services_services_section_links:[
            {
            label:"WordPress Development", 
            },
            {
              label:"Custom Website Development", 
            },
            {
              label:"Custom WordPress Development", 
            },
            {
              label:"Technical SEO", 
            }
          ],
          image: {
            alternativeText: "Website Development",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        },
        {
          title: "App Development",
          description: "We offer full-scale application software development services, including design, development, testing, integration, and post-launch maintenance. With us, you have one of the best app development companies on board for your project.",
          services_services_section_links:[
            { label: "Android Apps" },
            { label: "iOS Apps" },
            { label: "React Native Apps" },
            { label: "Flutter Apps" },
          ],
          image: {
            alternativeText: "App Development",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        },
        {
          title: "E-Commerce Development",
          description: "Let's build and set up an e-commerce store for your business that offers incredible user experience, sales-oriented web design, smooth checkout processes, and more. Let's expand your customer base x10.",
          services_services_section_links:[
            { label: "WooCommerce Development" },
            { label: "Shopify Development" },
            { label: "Magento (Adobe Commerce) Development" }
          ],
          image: {
            alternativeText: "E-Commerce Development",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        },
        {
          title: "Business Management Solutions",
          description: "Our custom software development solutions are designed to boost efficiency, reduce costs, and improve decision-making, helping businesses truly leverage the power of technology.",
          services_services_section_links:[
            { label: "CMS" },
            { label: "HRM" },
            { label: "CRM" },
            { label: "ERP" }
          ],
          image: {
            alternativeText: "Business Management Solutions",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        },
        {
          title: "Cloud Solutions",
          description: "Our scalable cloud solutions help businesses leverage cloud technology by providing flexible, cost-effective, and secure IT infrastructure and minimising upfront investments.",
          services_services_section_links:[
            { label: "Amazon Web Services (AWS)" },
            { label: "Google Cloud Platform (GCP)" },
            { label: "Microsoft Azure" },
            { label: "Server Architecture" }
          ],
          image: {
            alternativeText: "Cloud Solutions",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        },
        {
          title: "SEO Services",
          description: "We implement targeted SEO strategies, driven by business goals and industry dynamics. Our goal is to improve search engine rankings for your business and optimise your online presence to drive organic traffic.",
          services_services_section_links:[
            { label: "SEO Audit Services" },
            { label: "SEO Consultant Services" },
            { label: "SEO Migration Service" },
            { label: "Technical SEO Services" }
          ],
          image: {
            alternativeText: "SEO Services",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        },
        {
          title: "DevOps Services",
          description: "We streamline collaboration between development and operations, ensuring faster delivery, improved quality, and continuous innovation with our specialized DevOps services.",
          services_services_section_links:[
            { label: "CI/CD Pipelines" },
            { label: "Cloud Migration" },
            { label: "Consultation" }
          ],
          image: {
            alternativeText: "DevOps Services",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        },
        {
          title: "Custom Software Development",
          description: "We build custom software solutions, ideated, designed, and developed from scratch. The focus is on improving operational efficiency and solving problems to accelerate business growth.",
          services_services_section_links: [
            { label: "Custom Web Design & Applications" },
            { label: "Custom Mobile App Development" },
            { label: "Custom Business Management Solutions" }
          ],
          image: {
            alternativeText: "Custom Software Development",
            formats: {
              small: {
                url: websiteimg
              }
            }
          },
          button_label: "Learn More",
          button_link: "",
        }
      ],
    letsGetStartedContent: {
        heading: "Let's Get Started",
        description: "Speak with one of our industry experts today to discuss your project ideas and goals.",
        sub_heading: "Your Benefits:",
        button_label: "Schedule Free Consultancy",
        button_link: "",
        items: [
            {
                label: "Transparency",
            },
            {
                label: "Trust",
            },
            {
                label: "Communication",
            },
            {
                label: "Industry Experts",
            },
            {
                label: "Continuous Innovation",
            },
            {
                label: "Customer-Centric"
            },
        ]
        },
    faqContent: {
        heading: "Frequently Asked Questions",
        items:  [
          {
            question: "Will we have ownership of the software after it’s developed?",
            answer: `Typically, when you hire a development company to build custom software, your business owns the code and the rights to the software. 
                     However, it’s important to clarify this in the contract, as some development companies may retain ownership or rights to the software or its components.`,
          },
          {
            question: "How secure is custom software?",
            answer: `Custom software is designed with security in mind, ensuring that specific vulnerabilities are addressed for your business needs.`,
          },
          {
            question: "What is the role of UX/UI design in app development?",
            answer: `UX/UI design enhances user experience, making applications intuitive, engaging, and effective for their intended use.`,
          },
          {
            question: "How does web development support online marketing efforts?",
            answer: `Web development creates a strong foundation for online marketing efforts, enabling features like SEO, analytics, and content management.`,
          },
        ]
      }
}