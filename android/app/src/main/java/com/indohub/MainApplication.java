package com.indohub;

import android.app.Application;


import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
// import Branch and RNBranch
import io.branch.rnbranch.RNBranchPackage;
import io.branch.referral.Branch;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import org.reactnative.camera.RNCameraPackage;
import com.microsoft.codepush.react.CodePush;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.brentvatne.react.ReactVideoPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile(){
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new RNSharePackage(),
            new RNBranchPackage(),
            new ImagePickerPackage(),
            new ReanimatedPackage(),
        new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
        new SplashScreenReactPackage(),
        new ReactNativeConfigPackage(),
        new MapsPackage(),
        new ReactVideoPackage(),
        new RNDeviceInfo(),
        new RNI18nPackage(),
        new VectorIconsPackage(),
        new RNGestureHandlerPackage(),
        new RNFirebasePackage(),
        new RNFirebaseFirestorePackage(),
        new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Branch.getAutoInstance(this);
  }
}
