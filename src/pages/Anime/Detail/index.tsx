import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spin, message, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAnime } from '@/hooks/useAnime';
import './index.less';

interface AnimeDetail {
  id: number;
  title: string;
  image: string;
  synopsis: string;
  score: number;
  episodes: number;
  status: string;
  popularity: number;
}

const AnimeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const { getAnimeDetail, searchAnimeLoading } = useAnime({
    onGetAnimeDetailSuccess: (res) => {
      if (res.data) {
        setAnimeDetail({
          id: res.data.mal_id,
          title: res.data.title,
          image: res.data.images.jpg.large_image_url,
          synopsis: res.data.synopsis,
          score: res.data.score,
          episodes: res.data.episodes,
          status: res.data.status,
          popularity: res.data.popularity
        });
      }
    },
    onGetAnimeDetailError: () => {
      message.error('Failed to load anime details');
    }
  });

  useEffect(() => {
    if (id) {
      getAnimeDetail(Number(id));
    }
  }, [id, getAnimeDetail]);

  const handleBack = () => {
    navigate('/', { 
      state: {
        ...location.state,
        from: 'detail'
      }
    });
  };

  if (searchAnimeLoading) {
    return (
      <div className="anime-detail-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!animeDetail) {
    return null;
  }

  return (
    <div className="anime-detail-page">
      <Button
        className="anime-detail-back-button"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
      >
        Back to Home
      </Button>
      <div className="anime-detail-content">
        <div className="anime-detail-image">
          <img src={animeDetail.image} alt={animeDetail.title} />
        </div>
        <div className="anime-detail-info">
          <h1>{animeDetail.title}</h1>
          <div className="anime-detail-meta">
            <div className="meta-item">
              <span className="label">Score</span>
              <span className="value score">{animeDetail.score}</span>
            </div>
            <div className="meta-item">
              <span className="label">Episodes</span>
              <span className="value">{animeDetail.episodes}</span>
            </div>
            <div className="meta-item">
              <span className="label">Status</span>
              <span className="value status">{animeDetail.status}</span>
            </div>
            <div className="meta-item">
              <span className="label">Popularity</span>
              <span className="value popularity">#{animeDetail.popularity}</span>
            </div>
          </div>
          <div className="anime-detail-synopsis">
            <h2>Synopsis</h2>
            <p>{animeDetail.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage; 