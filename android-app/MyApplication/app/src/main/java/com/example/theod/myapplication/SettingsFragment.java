package com.example.theod.myapplication;

import android.os.Bundle;
import android.support.annotation.Nullable;

import com.lunchdaxuf.theod.myapplication.R;

public class SettingsFragment extends com.takisoft.fix.support.v7.preference.PreferenceFragmentCompat {

    @Override
    public void onCreatePreferencesFix(@Nullable Bundle savedInstanceState, String rootKey) {
        setPreferencesFromResource(R.xml.preferences, rootKey);

        // additional setup
    }
}