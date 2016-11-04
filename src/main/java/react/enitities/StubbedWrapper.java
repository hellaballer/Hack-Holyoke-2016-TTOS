package react.enitities;

import java.util.List;

/**
 * Created by jared on 11/3/16.
 */
public class StubbedWrapper {
    private List<Integer> stubList;
    private String paramValue;

    public StubbedWrapper(List<Integer> stubList, String paramValue) {
        this.stubList = stubList;
        this.paramValue = paramValue;
    }

    public List<Integer> getStubList() {
        return stubList;
    }

    public void setStubList(List<Integer> stubList) {
        this.stubList = stubList;
    }

    public String getParamValue() {
        return paramValue;
    }

    public void setParamValue(String paramValue) {
        this.paramValue = paramValue;
    }
}
