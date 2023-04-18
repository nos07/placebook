import 'mapbox-gl/dist/mapbox-gl.css';
import React, {
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
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { cities, City } from './main';
import { PlaceTypes } from '@/helpers/rating-categories';
import { cn } from '@/lib/utils';
import { Icons } from './ui/icons';
import { Button } from './ui/button';
import { placesSelect } from '@/app/api/places/route';

export const Map = ({
	city,
	places
}: {
	city: City,
	places: Array<{ [K in keyof typeof placesSelect.select]: string }>
}) => {
	const mapContainer = useRef<any>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [selectedPlace, setSelectedPlace] = useState('');
	const [popupOpen, setPopupOpen] = useState(false);

	const onOpenPopup = (name: string) => {
		setSelectedPlace(name);
		setPopupOpen(true);
	};

	const onClosePopup = () => {
		setSelectedPlace('');
		setPopupOpen(false);
	};

	const onCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				const { longitude, latitude } = position.coords;
				map.current!.flyTo({ center: [longitude, latitude], zoom: 15 });
			});
		}
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
			places.forEach((p: any) => {
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

				// TODO: cluster marker on zooming out
				// Create a new marker with the given longitude and latitude
				new mapboxgl.Marker(el)
					.setLngLat([p.longitude, p.latitude])
					.addTo(map.current!);
			});
		}
	}, [places]);

	const memoizedMap = useMemo(() => {
		return (
			<>
				<div
					ref={mapContainer}
					style={{
						width: '100%',
						height: '100vh',
						backgroundColor: '#EEE',
					}}
				/>
				<Button
					className="fixed bottom-6 right-20 backdrop-blur-sm bg-slate-900/20 hover:bg-slate-900/30 p-0 w-8 h-8"
					onClick={onCurrentLocation}
				>
					<Icons.locateFixed size={20} />
				</Button>
				<MarkerPopup
					name={selectedPlace}
					popupOpen={popupOpen}
					onClosePopup={onClosePopup}
				/>
			</>
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

export const MarkerPopup = ({ name, popupOpen, onClosePopup }: {
	name: string,
	popupOpen: boolean,
	onClosePopup: () => void,
}) => {
	return (
		<Sheet open={popupOpen} onOpenChange={onClosePopup}>
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
