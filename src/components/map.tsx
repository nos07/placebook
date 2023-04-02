import 'mapbox-gl/dist/mapbox-gl.css';
import React, {
	FunctionComponent,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { cities, City } from './main';
import { PlaceTypes } from '@/helpers/rating-categories';
import { cn } from '@/lib/utils';
import { usePlaces } from '@/swr/usePlaces';

export const Map = ({ city }: { city: City }) => {
	const { places } = usePlaces();
	const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [selectedPlace, setSelectedPlace] = useState('');
	const [popupOpen, setPopupOpen] = useState(false);

	const onOpenPopup = (name: string) => {
		setSelectedPlace(name);
		setPopupOpen(true);
	};

	useEffect(() => {
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v10',
			center: [0, 0],
			zoom: 5,
		});

		return () => {
			map.current!.remove();
		};
	}, []);

	useEffect(() => {
		if (map.current) {
			map.current!.flyTo({
				center: cities[city].coordinate, // center of Hanoi
				zoom: 12,
				speed: 1.5,
				curve: 1,
				easing: (t: any) => t,
			});
		}
	}, [city]);

	useEffect(() => {
		if (map.current && places.length) {
			places.forEach((p) => {
				// Create a new Marker element with a custom icon
				const el = document.createElement('div');
				el.className = 'marker';
				createRoot(el).render(
					<Marker
						type={p.type as PlaceTypes}
						name={p.name}
						onOpenPopup={onOpenPopup}
					/>,
				);

				// Create a new marker with the given longitude and latitude
				new mapboxgl.Marker(el)
					.setLngLat([p.longitude, p.latitude])
					.addTo(map.current!);
			});
		}
	}, [places]);

	const memoizedMap = useMemo(() => {
		return (
			<div
				ref={mapContainer}
				style={{
					width: '100%',
					height: '100vh',
					backgroundColor: '#EEE',
				}}
			/>
		);
	}, [popupOpen]);

	return memoizedMap;
};

const Marker = React.memo(
	({
		type,
		name,
		onOpenPopup,
	}: {
		type: PlaceTypes;
		name: string;
		onOpenPopup: (name: string) => void;
	}): JSX.Element => {
		const mapIcon: Record<PlaceTypes, string> = {
			coffee_shop: '/cup-with-straw.png',
			homestay: '/camping.png',
			pub: '/drink.png',
			bar: '/cocktail.png',
		};

		return (
			<div
				className="flex flex-col items-center"
				onClick={() => onOpenPopup(name)}
			>
				<div className={cn('map-marker', markerColor[type])}>
					<Image
						src={mapIcon[type as PlaceTypes]}
						alt="Place type icon"
						width={17}
						height={17}
						className="rotate-45 object-cover"
					/>
				</div>
				<span>{name}</span>
			</div>
		);
	},
);

const markerColor: Record<PlaceTypes, string> = {
	coffee_shop: 'bg-violet-200',
	homestay: 'bg-red-200',
	pub: 'bg-green-200',
	bar: 'bg-slate-200',
};

export const MarkerPopup = ({ name, popupOpen, onOpenChange }: any) => {
	return (
		<Sheet open={popupOpen} onOpenChange={onOpenChange}>
			<SheetContent position="right" size="default" className="overflow-scroll">
				<SheetHeader>
					{/* <AspectRatio ratio={16 / 9}>
						<Image
							src={photo}
							alt="Uploaded photo"
							fill
							className="rounded object-cover"
						/>
					</AspectRatio> */}
					<SheetTitle>Place view</SheetTitle>
				</SheetHeader>
				<>{name}</>
			</SheetContent>
		</Sheet>
	);
};
