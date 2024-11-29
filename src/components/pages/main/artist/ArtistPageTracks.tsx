import { IArtist } from "interfaces/artist";
import EmptyList from "components/main/error/EmptyList.tsx";
import {useEffect, useState} from "react";
import {ITrackFilter} from "interfaces/track";
import List from "components/pages/main/artist/tracksList/List.tsx";
import {useGetTracksQuery} from "services/track.ts";

interface IArtistTileProps {
    artist: IArtist;
}

const ArtistPageTracks: React.FC<IArtistTileProps> = ({ artist }) => {
    const [filter, setFilter] = useState<ITrackFilter>({
        PageIndex: 0,
        PageSize: 10,
        ArtistId: artist.id,
    });

    const [allTracks, setAllTracks] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const { data, isFetching } = useGetTracksQuery(filter);

    useEffect(() => {
        if (data) {
            if (data.data.length < filter.PageSize) {
                setHasMore(false);
            }

            setAllTracks(prevTracks => [...prevTracks, ...data.data]);
        }
    }, [data]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isFetching && hasMore) {
            setFilter(prev => ({ ...prev, PageIndex: prev.PageIndex + 1 }));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isFetching, hasMore]);

    return (
        <div className="relative w-full flex flex-row">
            <div className="flex flex-col px-[54px] py-[16px] w-full">

                {allTracks.length ? <List tracks={allTracks}/> : <EmptyList/>}

            </div>
        </div>
    )
}

export default ArtistPageTracks;