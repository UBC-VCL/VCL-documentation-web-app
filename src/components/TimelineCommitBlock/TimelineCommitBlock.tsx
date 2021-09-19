import React, {useState} from "react";
import moment from "moment";
import Chip from '@material-ui/core/Chip';
import './TimelineCommitBlock.css';
interface TimelineCommitBlockProps {
    author: string;
    elementChanged: string;
    project: string;
    date: Date;
    description: string;
    tags: Array<string>;
}

const TimelineCommitBlock: React.FC<TimelineCommitBlockProps> = (props) => {
    const [expand, setExpand] = useState(false);

    return(
        <div className="text"
             onClick={() => setExpand(!expand)}>
            { expand ? ExpandedTimelineContent(props): ClosedTimelineContent(props) }
        </div>
    );
};

const ExpandedTimelineContent: React.FC<TimelineCommitBlockProps> = (props) => {
    const { author, elementChanged, date, project,description, tags } = props;

    return(
        <div className="expandedTimeline">
            <p className="header">{author} added {elementChanged} to {project}</p>
            <p className="date">{moment(date).format('MMMM DD, YYYY')}</p>
            <div className="tag"> 
            {tags.map((tagName) => (
                <Chip
                 label={tagName}
                />
            ))}
            </div>
            <p className="shortDescription">{description}</p>
        </div>
    );
}
const ClosedTimelineContent: React.FC<TimelineCommitBlockProps> = (props) => {
    const { author, elementChanged, date, project,description, tags } = props;

    return(
        <div className="closedTimeline">
            <p className="header">{author} added {elementChanged} to {project}</p>
            <p className="date">{moment(date).format('MMMM DD, YYYY')}</p>
            <p className="expandedDescription">{description}</p>
        </div>
    );
}

export default TimelineCommitBlock;
