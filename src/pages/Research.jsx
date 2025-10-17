import React from "react";
import {
  FaSquareXTwitter,
  FaFilePdf,
  FaGithub,
  FaVideo,
  FaLink,
} from "react-icons/fa6";
import { SiHuggingface } from "react-icons/si";
import { FaFileAlt, FaDatabase, FaPlayCircle } from "react-icons/fa";
import ai_companionship from "../images/ai_companionship.png";
import burst from "../images/burst.png";
import commit from "../images/commit.png";
import culturebank from "../images/culturebank.png";
import ga2graph from "../images/ga2graph.png";
import gui from "../images/gui.jpg";
import metahkg from "../images/metahkg.png";
import tgonline from "../images/tgonline.png";
import hilite from "../images/hilite.png";
import organize_then_vote from "../images/organize_then_vote.png";

function HighlightAuthors({ authors, myName = "Yutong Zhang" }) {
  const parts = String(authors).split(/(\s*,\s*)/);
  const targets = [myName.toLowerCase(), `${myName.toLowerCase()}*`];

  return (
    <>
      {parts.map((part, i) => {
        const normalized = part.replace(/\s+/g, " ").trim().toLowerCase();
        if (targets.includes(normalized)) {
          return (
            <span key={i} style={{ fontWeight: "bold" }}>
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/**
 * Research card: image (left on desktop, top on mobile), title, authors, venue/year,
 * and optional link chips (Paper, Thread, Code, HF, Video, Site)
 */
function ResearchCard({
  imageSrc,
  imageAlt,
  title,
  authors,
  venue,
  year,
  award,
  demo,
  links = {},
}) {
  const { paper, twitter, github, huggingface, video, website } = links;

  return (
    <article className="rc-card">
      <div className="rc-image-wrap">
        <img src={imageSrc} alt={imageAlt || title} loading="lazy" />
      </div>

      <div className="rc-body">
        <header className="rc-head">
          <h3 className="rc-title">{title}</h3>
          {award && <span className="rc-award">{award}</span>}
        </header>

        <p className="rc-authors">
          <HighlightAuthors authors={authors} />
        </p>

        {(venue || year) && (
          <p className="rc-venue">
            {venue} {year ? `· ${year}` : ""}
          </p>
        )}

        <div className="rc-links">
          {paper && (
            <a
              className="rc-chip"
              href={paper}
              target="_blank"
              rel="noopener noreferrer"
              title="View Paper"
            >
              <FaFileAlt />
              <span>Paper</span>
            </a>
          )}
          {twitter && (
            <a
              className="rc-chip"
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter thread"
            >
              <FaSquareXTwitter />
              <span>Thread</span>
            </a>
          )}
          {github && (
            <a
              className="rc-chip"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <FaGithub />
              <span>Code</span>
            </a>
          )}
          {huggingface && (
            <a
              className="rc-chip"
              href={huggingface}
              target="_blank"
              rel="noopener noreferrer"
              title="Dataset on Hugging Face"
            >
              <FaDatabase />
              <span>Data</span>
            </a>
          )}
          {video && (
            <a
              className="rc-chip"
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              title="Video"
            >
              <FaVideo />
              <span>Video</span>
            </a>
          )}
          {demo && (
            <a
              className="rc-chip"
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
            >
              <FaPlayCircle />
              <span>Demo</span>
            </a>
          )}
          {website && (
            <a
              className="rc-chip"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              title="Project site"
            >
              <FaLink />
              <span>Website</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Research() {
  // NOTE: Replace imageSrc values with your actual images in /src/images/
  // (Use consistent aspect ratios; cards crop via object-fit: cover.)
  const items = [
    {
      title:
        "The Rise of AI Companions: How Human-Chatbot Relationships Influence Well-Being",
      authors:
        "Yutong Zhang, Dora Zhao, Jeffrey T Hancock, Robert Kraut, Diyi Yang",
      venue: "Preprint",
      year: "2025",
      imageSrc: ai_companionship,
      links: {
        paper: "https://arxiv.org/abs/2506.12605",
        twitter: "https://x.com/zhangyt0704/status/1935357314028220577",
        // github: "",
        // huggingface: "",
        // video: "",
        // website: "",
      },
    },
    {
      title:
        "Burst: Collaborative Curation in Connected Social Media Communities",
      authors:
        "Yutong Zhang, Taeuk Kang, Sydney Yeh, Anavi Baddepudi, Lindsay Popowski, Tiziano Piccardi, Michael S. Bernstein",
      venue:
        "ACM SIGCHI Conference on Computer-Supported Cooperative Work & Social Computing (CSCW)",
      year: "2025",
      imageSrc: burst,
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3757563",
        twitter: "https://x.com/zhangyt0704/status/1965095885429457386",
      },
    },
    // {
    //   title: "Responsible Human-Chatbot Interaction Towards Social Well-being",
    //   authors:
    //     "Camille Harris, Yutong Zhang, Allison Koenecke, Neha Kumar, Diyi Yang",
    //   venue:
    //     "ACM SIGCHI Conference on Human Factors in Computing Systems (CHI)",
    //   year: "2026 · In Submission",
    //   imageSrc: "/images/responsible_hci.jpg",
    //   links: {
    //     // paper: "",
    //   },
    // },
    {
      title: "Generative Interfaces for Language Models",
      authors:
        "Jiaqi Chen*, Yanzhe Zhang*, Yutong Zhang, Yijia Shao, Diyi Yang",
      venue: "Preprint",
      year: "2025",
      imageSrc: gui,
      links: {
        paper: "https://arxiv.org/abs/2508.19227",
        twitter: "https://x.com/StevenyzZhang/status/1960738887741120608",
        website: "https://salt-nlp.github.io/generative_interfaces/",
        github: "https://github.com/SALT-NLP/GenUI",
        huggingface: "https://huggingface.co/datasets/SALT-NLP/GenUI",
        demo: "https://salt-nlp.github.io/generative_interfaces/dataviewer/data_viewer.html",
      },
    },
    // {
    //   title: "Human-AI Collaborative Framework for Image Transcreation",
    //   authors:
    //     "Simran Khanuja, Yutong Zhang, Ayush Bheemaiah, Ayush Bheemaiah1, Jainish H. Patel, Arya Pasumarthi, Armaan Sharma, Sophia Li, Yueqi Song, Michael Saxon, Diyi Yang, Graham Neubig",
    //   venue: "ACL Rolling Review (ARR)",
    //   year: "2026 · In Submission",
    //   imageSrc: "/images/transcreation.jpg",
    //   links: {
    //     // paper: "",
    //   },
    // },
    {
      title:
        "Organize, Then Vote: Exploring Cognitive Load in Quadratic Survey Interfaces",
      authors:
        "Ti-Chung Cheng, Yutong Zhang*, Yi-Hung Chou*, Vinay Koshy, Tiffany Wenting Li, Karrie Karahalios, Hari Sundaram",
      venue:
        "ACM SIGCHI Conference on Human Factors in Computing Systems (CHI)",
      year: "2025",
      imageSrc: organize_then_vote,
      links: {
        paper: "https://dl.acm.org/doi/full/10.1145/3706598.3714193",
      },
    },
    {
      title: "Commit: Online Groups with Participation Commitments",
      authors: "Lindsay Popowski, Yutong Zhang, Michael S. Bernstein",
      venue:
        "ACM SIGCHI Conference on Computer-Supported Cooperative Work & Social Computing (CSCW)",
      year: "2024",
      award: "🏆 Best Paper Honorable Mention (top 3%)",
      imageSrc: commit,
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3687027",
        twitter: "https://x.com/lindsaypopowski/status/1852391119558226100",
      },
    },
    {
      title:
        "CultureBank: An Online Community-Driven Knowledge Base Towards Culturally Aware Language Technologies",
      authors:
        "Weiyan Shi, Ryan Li, Yutong Zhang, Caleb Ziems, Sunny Yu, Raya Horesh, Rogério Abreu De Paula, Diyi Yang",
      venue:
        "EMNLP Findings of the Association for Computational Linguistics (EMNLP)",
      year: "2024",
      imageSrc: culturebank,
      links: {
        paper: "https://aclanthology.org/2024.findings-emnlp.288/",
        website: "https://culturebank.github.io/",
        github: "https://github.com/SALT-NLP/CultureBank",
        huggingface: "https://huggingface.co/datasets/SALT-NLP/CultureBank",
        twitter: "https://x.com/shi_weiyan/status/1783173250513785219",
      },
    },
    {
      title: "HILITE: Human-in-the-loop Interactive Tool for Image Editing",
      authors:
        "Arya Pasumarthi, Armaan Sharma, Jainish Patel, Ayush Bheemaiah, Subhadra Vadlamannati, Seth Chang, Sophia Li, Eshaan Barkataki, Yutong Zhang, Diyi Yang, Graham Neubig, Simran Khanuja",
      venue:
        "IEEE International Conference on Big Data (Undergraduate Symposium)",
      year: "2024",
      award: "🏆 Best Paper Runner-Up",
      imageSrc: hilite,
      links: {
        paper: "https://ieeexplore.ieee.org/abstract/document/10825916/",
      },
    },
    {
      title:
        "GA2Graph: A Data-Driven Approach to Visualizing and Analyzing Collaborative Learning",
      authors:
        "Abdussalam Alawini, Isa Hajara-Yasmin, Jiabao Xu, Yutong Zhang, Zhijun Zhao",
      venue: "The IEEE Frontiers in Education Conference (FIE)",
      year: "2024",
      imageSrc: ga2graph,
      links: {
        paper: "https://ieeexplore.ieee.org/abstract/document/10892840",
      },
    },
    {
      title:
        "MetaHKG: Meta Hyperbolic Learning for Few-shot Temporal Reasoning",
      authors:
        "Ruijie Wang, Yutong Zhang, Jinyang Li, Shengzhong Liu, Dachun Sun, Tianchen Wang, Tianshi Wang, Yizhuo Chen, Denizhan Kara, Tarek Abdelzaher",
      venue:
        "International Conference on Research and Development in Information Retrieval (SIGIR)",
      year: "2024",
      imageSrc: metahkg,
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3626772.3657711",
      },
    },
    {
      title:
        "TGOnline: Enhancing Temporal Graph Learning with Adaptive Online Meta-Learning",
      authors:
        "Ruijie Wang, Jingyuan Huang, Yutong Zhang, Jinyang Li, Yufeng Wang, Wanyu Zhao, Shengzhong Liu, Charith Mendis, Tarek Abdelzaher",
      venue:
        "International Conference on Research and Development in Information Retrieval (SIGIR)",
      year: "2024",
      imageSrc: tgonline,
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3626772.3657791",
      },
    },
    // {
    //   title: "Influence Pathway Discovery on Social Media",
    //   authors:
    //     "Ruijie Wang*, Xinyi Liu*, Dachun Sun*, Jinning Li, Christina Youn, You Lyu, Jianyuan Zhan, Dayou Wu, Xinhe Xu, Mingjun Liu, Xinshuo Lei, Zhihao Xu, Yutong Zhang, Zehao Li, Qikai Yang, Tarek Abdelzaher",
    //   venue:
    //     "The 9th IEEE International Conference on Collaboration and Internet Computing (CIC)",
    //   year: "2023",
    //   imageSrc: influence_pathways,
    //   links: {
    //     paper: "https://arxiv.org/abs/2309.16071",
    //   },
    // },
  ];

  return (
    <section className="rc-wrap">
      <h1 className="rc-page-title">Publications</h1>
      <div className="rc-list">
        {items.map((item, idx) => (
          <ResearchCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
