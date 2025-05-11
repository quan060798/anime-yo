import { Input, message, Pagination, Spin, Empty } from "antd";
import './index.less';
import { useEffect, useState } from "react";
import { useAnime } from "@/hooks/useAnime";
import AnimeCard from "./component/AnimeCard";
import { useLocation } from "react-router-dom";

interface AnimeState {
  id: number;
  name: string;
  image: string;
}
const { Search } = Input;

const AnimeHomePage = () => {
  const [animeList, setAnimeList] = useState<AnimeState[]>([]);
  const [searchAnimeString, setSearchAnimeString] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const location = useLocation();

  // Handle state restoration or clear on refresh
  useEffect(() => {
    // Clear location state on page load/refresh
    window.history.replaceState({}, document.title);

    // Check if this is a fresh page load (no state) or coming from detail page
    if (!location.state) {
      // Clear all states on refresh or fresh page load
      setSearchAnimeString('');
      setPage(1);
      setPageSize(10);
    } else if (location.state.from === 'detail') {
      // Restore state when coming back from detail
      const { search, page: savedPage, pageSize: savedPageSize } = location.state;
      if (search) setSearchAnimeString(search);
      if (savedPage) setPage(savedPage);
      if (savedPageSize) setPageSize(savedPageSize);
    }
  }, [location.state]);

  const { searchAnime, searchAnimeLoading } = useAnime({
    onSearchSuccess: (res) => {
      if (res.data) {
        const data = res.data.map((item) => {
          return {
            id: item.mal_id,
            name: item.title,
            image: item.images.jpg.image_url,
          }
        })
        setAnimeList(data)
        setTotal(res.pagination?.items?.total || 0)
      }
    },
    onSearchError: () => {
      message.error('Search anime failed')
    }
  })

  // Handle search and pagination
  useEffect(() => {
    searchAnime({
      page,
      limit: pageSize,
      q: searchAnimeString
    });
  }, [page, pageSize, searchAnimeString, searchAnime]);

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return (
    <div className="anime-home-page">
      <div className="anime-home-page-search">
        <Search
          placeholder="Type to search anime"
          onChange={(e) => setSearchAnimeString(e.target.value)}
          loading={searchAnimeLoading}
          allowClear
          value={searchAnimeString}
          onClear={() => {
            setSearchAnimeString('')
            setPage(1)
          }}
        />
      </div>
      {searchAnimeLoading ? <div className="anime-home-page-loading"><Spin size="large" /></div> : (
        <>
          {animeList.length > 0 ? (
            <>
              <div className="anime-home-page-list">
                {animeList.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    id={anime.id}
                    name={anime.name}
                    image={anime.image}
                    state={{
                      search: searchAnimeString,
                      page,
                      pageSize,
                      from: 'home'
                    }}
                  />
                ))}
              </div>
              <div className="anime-home-page-pagination">
                <Pagination
                  current={page}
                  pageSize={pageSize}
                  total={total}
                  onChange={handlePageChange}
                  showSizeChanger
                  showQuickJumper
                  pageSizeOptions={[10, 15, 20, 25]}
                />
              </div>
            </>
          ) : (
            <div className="anime-home-page-empty">
              <Empty
                description={
                  searchAnimeString
                    ? "No anime found matching your search"
                    : "No anime available"
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AnimeHomePage;