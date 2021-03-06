import React, { useEffect } from 'react';
import { Livestream, User } from '@skillfuze/types';
import { SocketIOProvider } from '@khaled-hamam/use-socketio';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';

import Layout from '../../../components/Layout';
import { LivestreamService } from '../../../services/livestreams.service';
import VideoLayout from '../../../components/VideoLayout';
import config from '../../../../config';
import withAuth from '../../../utils/withAuth';
import { mixpanelEvents } from '../../../../config/mixpanel.events';

interface Props {
  stream: Livestream;
  user?: User;
}

const ViewLivestream = ({ stream, user }: Props) => {
  const router = useRouter();
  const onDelete = async () => {
    await LivestreamService.delete(stream.id);
    router.push(`/`);
  };

  useEffect(() => {
    mixpanel.identify(user?.id || 'GUEST');
    mixpanel.track(mixpanelEvents.VIEW_LIVESTREAM);
  }, []);

  return (
    <SocketIOProvider
      url={`${config.apiURL}/livestreams`}
      opts={{ query: { streamId: stream.id }, transports: ['websocket'], rememberUpgrade: true }}
    >
      <Layout title={stream.title} user={user}>
        <VideoLayout
          isLive
          user={stream.streamer}
          content={stream}
          url={`${config.httpStreamingServerURL}/live/${stream.streamKey}/playlist.m3u8`}
          videoType="application/x-mpegURL"
          viewer={user}
          enableControls={user?.id === stream.streamer.id}
          onDelete={onDelete}
        />
      </Layout>
    </SocketIOProvider>
  );
};

ViewLivestream.getInitialProps = async (ctx) => {
  const stream = await LivestreamService.getOne(ctx.query.livestreamId.toString());
  return { stream };
};

export default withAuth({})(ViewLivestream);
