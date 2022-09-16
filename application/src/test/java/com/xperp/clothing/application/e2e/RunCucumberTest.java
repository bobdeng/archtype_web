package com.xperp.clothing.application.e2e;

import com.xperp.clothing.application.IntegrationTest;
import org.junit.platform.suite.api.*;

import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;

@Suite
@IncludeEngines("cucumber")
@ExcludeEngines({"junit-jupiter"})
@SelectClasspathResource("e2e")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.xperp.clothing.application.e2e")
public class RunCucumberTest extends IntegrationTest {
}
