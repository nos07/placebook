'use client';

import { PlaceTypes } from '@/helpers/rating-categories';
import mapboxgl from 'mapbox-gl';
import React, { useCallback, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { Map } from './map';
import { Nav } from './nav';
import { useDebounce } from '@/hooks/use-debounce';

export const cities: Record<string, {coordinate: mapboxgl.LngLatLike;
	name: string;}> = {
	ha_noi: {
		coordinate: [105.8342, 21.0278],
		name: 'Ha Noi',
	},
	da_nang: {
		coordinate: [108.0717, 16.0545],
		name: 'Da Nang',
	},
	da_lat: {
		coordinate: [108.4583, 11.9404],
		name: 'Da Lat',
	},
	sai_gon: {
		coordinate: [106.6297, 10.8231],
		name: 'Sai Gon',
	},
};
export type City = keyof typeof cities;

export const Main = () => {
	const [place, setPlace] = useState('');
	const [city, setCity] = useState<City>('ha_noi');
	const debouncedPlace = useDebounce<string>(place);

	const onChangeCity = useCallback((newCity: City) => {
		setCity(newCity);
	}, [setCity]);

	return (
		<>
			<Nav onChangeCity={onChangeCity} />
			<Map city={city} />
		</>
	)
}

