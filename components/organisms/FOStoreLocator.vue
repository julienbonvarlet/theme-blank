<template>
  <div class="f-store-locator">
    <FMSectionContainer :padding-x="true" max-width="xl" :padding-y="true">
      <FATitle
        class="f-store-locator__title"
        :title="$t('pages.stores.title')"
        size="l"
        tag="h2"
      />
    </FMSectionContainer>
    <FMSectionContainer :padding-x="true" max-width="xl" :padding-y="false">
      <div class="f-store-locator__content">
        <!-- STORE LIST -->
        <div ref="storesContainer" class="f-store-locator__list">
          <FMStoreCard
            v-for="storeItem in geoJson.features"
            :key="storeItem.id"
            ref="storeItems"
            :is-focus="currentStoreId == storeItem.id"
            :store="storeItem"
            class="f-store-locator__store-item"
            @focus-store="focusStore(storeItem)"
          />
        </div>

        <!-- MAPBOX -->
        <div ref="mapContainer" class="f-store-locator__map"></div>

        <!-- STORE POPUP -->
        <div id="popup" ref="popupTemplate" class="f-store-locator__popup">
          <FAIcon
            class="f-store-locator__popup-close"
            icon="cross"
            @click="currentStoreId = null"
          />
          <FMStoreCard
            v-if="currentStore"
            :store="currentStore"
            :is-focus="false"
            :show-planning="false"
          />
        </div>
      </div>
    </FMSectionContainer>
  </div>
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const config = useRuntimeConfig();

const props = withDefaults(
  defineProps<{
    stores: any[];
  }>(),
  {}
);

// DOM element references
const mapContainer = ref(null);
const popupTemplate = ref(null);
const storesContainer = ref(null);
const storeItems = ref(null);

// Current store id selected
const currentStoreId = ref(null);

// Mapbox instances
const mapInstance = ref(null);
const popupInstance = ref(null);

// Construct our GeoJSON object
const geoJson = computed(() => {
  return {
    type: "FeatureCollection",
    features: props.stores.map((store, index) => ({
      type: "Feature",
      id: index,
      geometry: {
        type: "Point",
        coordinates: [parseFloat(store.long), parseFloat(store.lat)],
      },
      properties: {
        id: index,
        store: { ...store },
      },
    })),
  };
});

const cleanedGeoPos = geoJson.value.features
  .map((feature) => {
    if (
      feature.geometry.coordinates &&
      feature.geometry.coordinates[0] &&
      feature.geometry.coordinates[1]
    ) {
      return feature.geometry.coordinates;
    }
  })
  .filter((elm) => elm);

// If only one store is existing, duplicate it because mapboxgl.LngLatBounds wiat for at leat 2 points
if (cleanedGeoPos.length === 1) {
  cleanedGeoPos.push(cleanedGeoPos[0]);
}

let automaticBounds = new mapboxgl.LngLatBounds(cleanedGeoPos);

const padding = 1;
automaticBounds = new mapboxgl.LngLatBounds(
  [
    automaticBounds.getNorthEast().lng - padding,
    automaticBounds.getNorthEast().lat - padding,
  ],
  [
    automaticBounds.getSouthWest().lng + padding,
    automaticBounds.getSouthWest().lat + padding,
  ]
);

// Init the map when the component is mounted
onMounted(() => {
  // Initialize the map
  mapboxgl.accessToken = config.public.faume.mapbox.apiKey;
  mapInstance.value = new mapboxgl.Map({
    padding: true,
    container: mapContainer.value,
    style: `mapbox://styles/faume/${config.public.faume.mapbox.styleId}`, // Replace with your style URL
    bounds: automaticBounds,
    minZoom: 3,
  }).on("load", onMapLoad);
});

const onMapLoad = () => {
  mapInstance.value.loadImage(
    `https://faume.imgix.net/${config.public.faume.clientId}/pin-map.png`,
    (error, image) => {
      if (error) {
        throw error;
      }
      mapInstance.value.addImage("custom-marker", image);
      mapInstance.value.addLayer({
        id: "locations",
        type: "symbol",
        source: {
          type: "geojson",
          data: geoJson.value,
        },
        layout: {
          "icon-image": "custom-marker",
          "icon-size": 0.5,
          "icon-allow-overlap": false,
        },
      });

      // Detect marker click
      mapInstance.value.on("click", (event) => {
        // Determine if a feature in the "locations" layer exists at that point.
        const features = mapInstance.value.queryRenderedFeatures(event.point, {
          layers: ["locations"],
        });
        // If it does not exist, return
        if (!features.length) {
          return;
        }

        const clickedPoint = features[0];

        // Fly to the point
        focusStore(clickedPoint);
      });
    }
  );
};

const focusStore = (currentFeature) => {
  if (currentFeature.id === currentStoreId.value) {
    return;
  }
  // Update the currentStoreId
  currentStoreId.value = currentFeature.id;
};

const currentStore = computed(() => {
  if (currentStoreId.value === null) {
    return null;
  }
  return geoJson.value?.features.find(
    (store) => store.id == currentStoreId.value
  );
});

// Watch the currentStoreId and update the marker on the map
watch(currentStore, (store) => {
  if (store) {
    // Update or create the popup instance
    if (popupInstance.value) {
      popupInstance.value.setLngLat(store.geometry.coordinates);
    } else {
      popupInstance.value = new mapboxgl.Popup({
        closeOnClick: false,
        closeButton: false,
        maxWidth: 300,
      })
        .setLngLat(store.geometry.coordinates)
        .setDOMContent(popupTemplate.value)
        .addTo(mapInstance.value);
      popupInstance.value;
    }

    // Map fly to the point
    mapInstance.value.flyTo({
      center: store.geometry.coordinates,
      zoom: 15,
    });

    // Update scroll of storeItems, to the selected store
    storesContainer.value.scrollTo({
      top: storeItems.value[store.id].el.offsetTop - 50,
      behavior: "smooth",
    });
  } else {
    popupInstance.value?.remove();
    popupInstance.value = null;
  }
});

// Desotry map instance when component is unmounted
onUnmounted(() => {
  mapInstance.value?.remove();
});
</script>

<style lang="scss">
@import url("mapbox-gl/dist/mapbox-gl.css");

.f-store-locator {
  padding-bottom: var(--f-length-1);

  &__title {
    text-align: center;
  }

  &__content {
    display: flex;
    flex-direction: row;

    & > #popup {
      display: none;
    }
  }

  &__list {
    position: relative;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
    gap: var(--f-length-2);
    padding-inline: var(--f-length-2);
    max-height: 600px;
    @include media("<desktop") {
      grid-template-columns: repeat(1, 1fr);
    }
    @include media("<=tablet") {
      max-height: none;
      width: 100%;
      grid-template-columns: repeat(2, 1fr);
    }
    @include media("<500px") {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__map {
    flex-grow: 1;
    min-height: 500px;
    @include media("<=tablet") {
      display: none;
    }
  }

  &__store-item {
    margin: 0 auto;
    border: 1px solid var(--f-color-border);
    @include media("<500px") {
      margin: 0 auto;
    }
  }

  &__popup {
    &-close {
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 10px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
