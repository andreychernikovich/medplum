import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { ActivityIndicator, FlatList } from 'react-native';
import { IconButton } from "react-native-paper";
import { useMedplum, useMedplumProfile } from '@medplum/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";

import { COLORS } from "@constants/colors";
import MeasurementsScreen from "@containers/graphicScreen";
import { useAppNavigation } from "@hooks/useAppNavigation";
import { setMeasurement, setLoading } from "@actions/ble";
import { trackLog } from "@utils/trackLog";
import { getIcon } from "@utils/bleIcons";

import {
  Observation, 
  OfflineProps,
  PostBatchBody
} from "@src/types/observation";
import { StoreState } from "@src/types/ble";
import {
  formatToMonthDay, 
  formatToTime
} from "@utils/date";
import {
  getOfflineDataForPost, 
  parseOfflineData
} from "@utils/parseOfflineData";
import {
  getCommunicationsList,
  getObservationsList
} from "@utils/measumentsList";
import postBatchBody from "@utils/postBatchBody";
import getBatchBody from "@utils/getBatchBody";
import { dataQuery }  from "src/localDB/utils/localBD";
import { resetLocalDB } from "src/localDB/utils/saveLocalObservation";

import TimelineItem from "@components/TimelineItem";
import CustomHeader from '@components/CustomHeader';
import i18n from '@i18n/index';

import styles from "./styles";
import { API_URL } from "@constants/api";

type HeaderProps = {
  options: {
    header?: () => ReactNode;
    headerRight?: () => ReactNode;
    headerLeft?: () => void;
  }
}

const Home = () => {
  const medplum = useMedplum();
  const dispatch = useDispatch();
  const navigation = useAppNavigation();
  const { isConnected } = useNetInfo();
  const { meta: { author } } = useMedplumProfile();
  const { measurements, loading } = useSelector((state: StoreState) => {
    return state.ble
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValue] = useState<Array<Observation>>(measurements);
  const [values, setValue] = useState<Array<OfflineProps>>([]);

  useEffect(() => {
    dataQuery('observations')?.then((rez) => setValue(rez));
  }, [])

  useEffect(()=>{
    if(values.length && isConnected) {
      const offlineData = parseOfflineData(values);
      const batchBody = postBatchBody(getOfflineDataForPost(offlineData))
      postOfflineBatch(batchBody)
    }
  }, [isConnected, values])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ options }: HeaderProps) => <CustomHeader title={i18n.t("headers.timeline")} headerRight={options.headerRight} />,
      headerRight: () =>
        <IconButton
            icon={"plus"}
            iconColor={COLORS.primaryDark}
            size={32}
            onPress={handleDropdown}
        />
    });
  }, [navigation]);

  useEffect(() => {
    setSelectedValue(measurements ? measurements : [])
  }, [measurements]);

  useEffect(()=>{
    const getAllData = async () => {
        const data = getBatchBody(author)
        try {
          dispatch(setLoading(true))
          const { entry } = await medplum.post(API_URL, {...data});
          const observation = getObservationsList(entry[0])
          const communications = getCommunicationsList(entry[1])
          const rezData = [...observation, ...communications].sort((a, b) => +new Date(b.date) - (+new Date(a.date)));
          dispatch(setMeasurement(rezData));
        } catch(error) {
          trackLog<Error>("error in read resource", error);
        } finally {
          dispatch(setLoading(false))
        }
      }
    getAllData()
  }, [])

  const postOfflineBatch = async (batch: PostBatchBody) => {
    try {
      await medplum.post(API_URL, {...batch});
      resetLocalDB()
    } catch (e) {
      trackLog<Error>("error in post offline batch of measurements", e);
    }
  }

  const handleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const renderRow = (item: Observation) => {
    return (
      <>
        {!!item.subtitle && (<TimelineItem
          title={item.title}
          subtitle={item.subtitle}
          comment={item.comment}
          icon={getIcon(item.type)}
          date={formatToMonthDay(item.date)}
          time={formatToTime(item.date)}
        />)}
      </>
    );
  };

  const renderLoader = () => {
    return (loading && selectedValues.length) ? <ActivityIndicator size="large" /> : null
  };

  const renderContent = () => {
    return <>
      {!isOpen &&
        <FlatList
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          data={selectedValues}
          keyExtractor={item => item.id}
          renderItem={({item}) => renderRow(item)}
          ListHeaderComponent={renderLoader}
        />}
        <MeasurementsScreen isOpen={isOpen} handleDropdown={handleDropdown} />
      </>
  }

  return renderContent();
};

export default Home
