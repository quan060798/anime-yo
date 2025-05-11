import './index.less';
import { useNavigate } from 'react-router-dom';

interface AnimeCardProps {
    id: number;
    name: string;
    image: string;
    state: {
        search: string;
        page: number;
        pageSize: number;
        from: 'home' | 'detail';
    };
}

const AnimeCard = (props: AnimeCardProps) => {
    const { id, name, image, state } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/anime/${id}`, { state });
    };

    return (
        <div className="anime-card-container" onClick={handleClick}>
            <img src={image} alt={name} className="anime-card-image" />
            <div className="anime-card-name">{name}</div>
        </div>
    )
}

export default AnimeCard;