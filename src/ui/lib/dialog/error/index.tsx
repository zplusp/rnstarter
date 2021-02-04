import React from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import {View} from 'react-native';
import Dialog from 'react-native-dialog';

declare type ErrorDialogProps = {
  visible: boolean;
  onDismiss(): void;
  message: any;
  title?: string;
};

const ErrorDialog = (props: ErrorDialogProps) => {
  return (
    <View>
      <Dialog.Container
        visible={props.visible}
        onBackdropPress={props.onDismiss}>
        {<Dialog.Title>{props.title || 'Error'}</Dialog.Title>}
        <Dialog.Description>
          {typeof props.message === 'string'
            ? props.message
            : 'Something went wrong'}
        </Dialog.Description>
        <Dialog.Button
          label="Ok"
          onPress={props.onDismiss}
          color={EStyleSheet.value('$primary')}
        />
      </Dialog.Container>
    </View>
  );
};

export default ErrorDialog;
