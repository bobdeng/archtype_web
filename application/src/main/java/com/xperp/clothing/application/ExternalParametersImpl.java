package com.xperp.clothing.application;

import cn.bobdeng.rbac.domain.config.ParameterName;
import cn.bobdeng.rbac.server.impl.configuration.ExternalParameters;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExternalParametersImpl implements ExternalParameters {
    @Override
    public List<ParameterName> parameters() {
        return List.of();
    }
}
